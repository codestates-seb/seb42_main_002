package com.mainproject.back.member.mapper;


import com.mainproject.back.language.dto.MemberLanguageDto;
import com.mainproject.back.language.entity.MemberLanguage;
import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.dto.MemberTagResponseDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.tag.entity.MemberTag;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

  Member memberPostToMember(MemberDto.Post memberPostDto);

//  default Member memberPostToMember(MemberDto.Post requestBody) {
//    if (requestBody == null) {
//      return null;
//    }
//    Member member = new Member();
//
//    List<MemberTag> memberTags = requestBody.getMemberTags().stream()
//        .map(memberTagDto -> {
//          MemberTag memberTag = new MemberTag();
//          Tag tag = Tag.builder().tagId(memberTagDto.getTagId()).build();
//          memberTag.addTag(tag);
//          memberTag.addMember(member);
//          return memberTag;
//        }).collect(Collectors.toList());
//
//    member.setName(requestBody.getName());
//    member.setEmail(requestBody.getEmail());
//    member.setPassword(requestBody.getPassword());
//    member.setBirthday(requestBody.getBirthday());
//    member.setIntroduce(requestBody.getIntroduce());
//    member.setLocation(requestBody.getLocation());
//    member.setGender(requestBody.getGender());
//    member.setProfile(requestBody.getProfile());
//    member.setMemberTags(memberTags);
//
//    return member;
//  }

  Member memberPatchToMember(MemberDto.Patch memberPatchDto);

//  default Member memberPatchToMember(MemberDto.Patch requestBody) {
//    if (requestBody == null) {
//      return null;
//    }
//
////    Member.MemberBuilder member = Member.builder();
////
////    member.memberId(requestBody.getMemberId());
////    member.name(requestBody.getName());
////    member.introduce(requestBody.getIntroduce());
////    member.profile(requestBody.getProfile());
////    member.memberStatus(requestBody.getMemberStatus());
////    member.memberTags(requestBody.getMemberTags().stream()
////        .map(memberTagDto -> {
////          MemberTag memberTag = new MemberTag();
////          Tag tag = Tag.builder().tagId(memberTagDto.getTagId()).build();
////          memberTag.addTag(tag);
////          Member member1 = new Member();
////          member1.setMemberId(requestBody.getMemberId());
////          memberTag.addMember(member1);
////          return memberTag;
////        }).collect(Collectors.toList())
////    );
////
////    return member.build();
//
////    if (requestBody == null) {
////      return null;
////    }
////    Member member = new Member();
////    member.setMemberId(requestBody.getMemberId());
////    member.setName(requestBody.getName());
////    member.setIntroduce(requestBody.getIntroduce());
////    member.setProfile(requestBody.getProfile());
////    member.setMemberStatus(requestBody.getMemberStatus());
////
////    return member;
//  }

  default MemberDto.Response memberToMemberResponse(Member member) {
    MemberDto.Response.ResponseBuilder builder = MemberDto.Response.builder()
        .memberId(member.getMemberId())
        .memberStatus(member.getMemberStatus())
        .name(member.getName())
        .location(member.getLocation())
        .email(member.getEmail())
        .birthday(member.getBirthday())
        .location(member.getLocation())
        .gender(member.getGender())
        .profile(member.getProfile())
        .tag(member.getMemberTags().stream().map(memberTag -> memberTag.getTag().getName()).collect(
            Collectors.toList()));

    List<MemberLanguage> memberLanguageList = member.getMemberLanguages();
    List<MemberLanguageDto> memberLanguageDtoList = memberLanguageList.stream().map(
            (memberLanguage) -> MemberLanguageDto.builder()
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

}
