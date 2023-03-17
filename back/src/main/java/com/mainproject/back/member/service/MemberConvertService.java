package com.mainproject.back.member.service;

import com.mainproject.back.block.entity.Block;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.follow.service.FollowService;
import com.mainproject.back.language.dto.MemberLanguageDto;
import com.mainproject.back.language.entity.Language;
import com.mainproject.back.language.entity.MemberLanguage;
import com.mainproject.back.language.exception.LanguageExceptionCode;
import com.mainproject.back.language.service.LanguageService;
import com.mainproject.back.letter.dto.LetterSimpleDto;
import com.mainproject.back.letter.dto.LetterSimpleDto.LetterStatus;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.service.LetterService;
import com.mainproject.back.member.dto.MemberBlockDto;
import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.dto.MemberSearchDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.mapper.MemberMapper;
import com.mainproject.back.tag.entity.MemberTag;
import com.mainproject.back.tag.entity.Tag;
import com.mainproject.back.tag.exception.TagExceptionCode;
import com.mainproject.back.tag.service.TagService;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MemberConvertService {

  private final TagService tagService;
  private final MemberMapper memberMapper;
  private final LanguageService languageService;
  private final FollowService followService;
  private final MemberService memberService;
  private final LetterService letterService;

  @Transactional
  public Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto) {
    Member member = memberMapper.memberPatchToMember(memberPatchDto);
    Optional.ofNullable(memberPatchDto.getTag()).ifPresent((tags) -> getMemberTag(member, tags));
    Optional.ofNullable(memberPatchDto.getLanguage())
        .ifPresent((languages) -> getMemberLanguage(member, languages));
    return member;
  }

  @Transactional
  private void getMemberLanguage(Member member, List<MemberLanguageDto> languageDtoList) {
    List<Language> allLanguages = languageService.findAllLanguages();
    List<MemberLanguage> memberLanguageList = languageDtoList.stream().map(languageDto -> {
      MemberLanguage memberLanguage = MemberLanguage.builder().level(languageDto.getLevel())
          .build();
      memberLanguage.addLanguage(findLanguage(allLanguages, languageDto.getNation()));
      memberLanguage.addMember(member);
      return memberLanguage;
    }).collect(Collectors.toList());
    member.setMemberLanguages(memberLanguageList);
  }

  private Language findLanguage(List<Language> allLanguage, String nation) {
    for (Language language : allLanguage) {
      if (language.getNation().equals(nation)) {
        return language;
      }
    }
    throw new BusinessLogicException(LanguageExceptionCode.LANGUAGE_NOT_FOUND);
  }

  @Transactional
  public void getMemberTag(Member member, List<String> names) {
    List<Tag> allTags = tagService.findAllTags();
    List<MemberTag> memberTagList = names.stream().map(name -> {
      Tag tag = findTag(allTags, name);
      MemberTag memberTag = MemberTag.builder().build();
      memberTag.addMember(member);
      memberTag.addTag(tag);
      return memberTag;
    }).collect(Collectors.toList());
    member.setMemberTags(memberTagList);
  }

  private Tag findTag(List<Tag> allTags, String name) {
    for (Tag tag : allTags) {
      if (tag.getName().equals(name)) {
        return tag;
      }
    }
    throw new BusinessLogicException(TagExceptionCode.TAG_NOT_FOUND);
  }

  @Transactional
  public List<Tag> getTags(String tagNames) {
    String[] tagNameArr = tagNames.split("[+]");
    List<Tag> allTags = tagService.findAllTags();
    List<Tag> tagList = Arrays.stream(tagNameArr).map(name -> findTag(allTags, name)).collect(
        Collectors.toList());
    return tagList;
  }

  public MemberDto.Response memberToResponseDto(Member member, long memberId) {
    MemberDto.Response response = memberMapper.memberToMemberResponse(member);
    List<Long> followingIdList = followService.findFollowingId(memberId);
    response.setFriend(findIsFriend(followingIdList, member.getMemberId()));
    return response;
  }

  public Page<MemberSearchDto> memberPageToMemberSearchDtoPage(Page<Member> searchPage,
      long memberId) {
    List<Long> followingIdList = followService.findFollowingId(memberId);
    return searchPage.map(search -> memberToMemberSearchDto(search, followingIdList));
  }

  private MemberSearchDto memberToMemberSearchDto(Member member, List<Long> followingIdList) {
    MemberSearchDto memberSearchDto = memberMapper.memberToMemberSearchDto(member);
    memberSearchDto.setFriend(findIsFriend(followingIdList, member.getMemberId()));
    return memberSearchDto;
  }

  private boolean findIsFriend(List<Long> followingIdList, Long memberId) {
    for (Long followingId : followingIdList) {
      if (followingId.equals(memberId)) {
        return true;
      }
    }
    return false;
  }

  public Page<MemberLetterDto> followPageToMemberLetterPage(Page<Follow> followPage) {
    return followPage.map(follow -> {
      Member member = memberService.findMember(follow.getFollowing().getMemberId());
      Letter letter = letterService.findLastLetter(follow.getFollower().getMemberId(),
          follow.getFollowing().getMemberId());
      MemberLetterDto.MemberLetterDtoBuilder builder = MemberLetterDto.builder()
          .name(member.getName())
          .profile(member.getProfile())
          .location(member.getLocation())
          .memberId(member.getMemberId());
      if (letter == null) {
        builder.lastLetter(null);
      } else {
        builder.lastLetter(LetterSimpleDto.builder().status(
                follow.getFollower().getMemberId() == letter.getReceiver().getMemberId()
                    ? LetterStatus.RECEIVED : LetterStatus.SENT).isRead(letter.getIsRead())
            .createdAt(letter.getCreatedAt()).build());
      }
      return builder.build();
    });
  }

  public Page<MemberBlockDto> blockPageToMemberBlockPage(Page<Block> blockPage) {
    return blockPage.map(block -> {
      Member target = memberService.findMember(block.getTarget().getMemberId());
      return MemberBlockDto.builder().memberId(target.getMemberId()).name(target.getName())
          .profile(target.getProfile()).location(target.getLocation()).build();
    });
  }
}
