package com.mainproject.back.member.mapper;


import com.mainproject.back.language.dto.MemberLanguageDto;
import com.mainproject.back.language.entity.MemberLanguage;
import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.dto.MemberRecommendDto;
import com.mainproject.back.member.dto.MemberSearchDto;
import com.mainproject.back.member.dto.MemberTagResponseDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.tag.dto.TagSimpleDto;
import com.mainproject.back.tag.entity.MemberTag;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

  Member memberPostToMember(MemberDto.Post memberPostDto);

  Member memberPatchToMember(MemberDto.Patch memberPatchDto);

  default MemberDto.Response memberToMemberResponse(Member member) {
    MemberDto.Response.ResponseBuilder builder = MemberDto.Response.builder()
        .memberId(member.getMemberId())
        .memberStatus(member.getMemberStatus())
        .name(member.getName())
        .location(member.getLocation())
        .email(member.getEmail())
        .birthday(member.getBirthday())
        .introduce(member.getIntroduce())
        .location(member.getLocation())
        .gender(member.getGender())
        .profile(member.getProfile())
        .tag(member.getMemberTags().stream().map(memberTag -> {
          TagSimpleDto dto = TagSimpleDto.builder()
              .tagId(memberTag.getTag().getTagId())
              .name(memberTag.getTag().getName())
              .build();
          return dto;
        }).collect(Collectors.toList()));
    List<MemberLanguage> memberLanguageList = member.getMemberLanguages();
    List<MemberLanguageDto> memberLanguageDtoList = memberLanguageList.stream().map(
            (memberLanguage) -> MemberLanguageDto.builder()
                .languageId(memberLanguage.getLanguage().getLanguageId())
                .nation(memberLanguage.getLanguage().getNation()).level(memberLanguage.getLevel())
                .build())
        .collect(
            Collectors.toList());
    builder.language(memberLanguageDtoList);
    return builder.build();
  }

  List<MemberDto.Response> membersToMemberResponses(List<Member> members);

  default List<MemberTagResponseDto> memberTagsToMemberTagResponses(
      List<MemberTag> memberTags) {
    return memberTags
        .stream()
        .map(memberTag -> MemberTagResponseDto
            .builder()
            .name(memberTag.getTag().getName())
            .build())
        .collect(Collectors.toList());
  }

  default Page<MemberRecommendDto> pageMemberToMemberRecommendDtoPage(Page<Member> memberPage) {
    return memberPage.map(this::memberToMemberRecommend);
  }

  default MemberRecommendDto memberToMemberRecommend(Member member) {
    MemberRecommendDto.MemberRecommendDtoBuilder builder = MemberRecommendDto.builder()
        .memberId(member.getMemberId())
        .name(member.getName())
        .profile(member.getProfile());
    return builder.build();
  }

  MemberSearchDto memberToMemberSearchDto(Member member);
}
