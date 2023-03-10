package com.mainproject.back.member.service;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.language.dto.MemberLanguageDto;
import com.mainproject.back.language.entity.Language;
import com.mainproject.back.language.entity.MemberLanguage;
import com.mainproject.back.language.exception.LanguageExceptionCode;
import com.mainproject.back.language.service.LanguageService;
import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.mapper.MemberMapper;
import com.mainproject.back.tag.entity.MemberTag;
import com.mainproject.back.tag.entity.Tag;
import com.mainproject.back.tag.exception.TagExceptionCode;
import com.mainproject.back.tag.service.TagService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberConvertService {

  private final TagService tagService;
  private final MemberMapper memberMapper;
  private final LanguageService languageService;

  public Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto) {
    Member member = memberMapper.memberPatchToMember(memberPatchDto);
    Optional.ofNullable(memberPatchDto.getTag()).ifPresent((tags) -> getMemberTag(member, tags));
    Optional.ofNullable(memberPatchDto.getLanguage())
        .ifPresent((languages) -> getMemberLanguage(member, languages));
    return member;
  }

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

  private void getMemberTag(Member member, List<String> names) {
    List<Tag> allTags = tagService.findAllTags();
    List<MemberTag> memberTagList = names.stream().map(name -> {
      MemberTag memberTag = MemberTag.builder().build();
      memberTag.addMember(member);
      memberTag.addTag(findTag(allTags, name));
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

}
