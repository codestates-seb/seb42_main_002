package com.mainproject.back.member.mapper;


import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.dto.MemberTagDto;
import com.mainproject.back.member.dto.MemberTagResponseDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.language.MemberLanguage;
import com.mainproject.back.member.tag.MemberTag;
import com.mainproject.back.tag.entity.Tag;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

  default Member memberPostToMember(MemberDto.Post requestBody) {
    if (requestBody == null) {
      return null;
    }
    Member member = new Member();

    List<MemberTag> memberTags = requestBody.getMemberTags().stream()
        .map(memberTagDto -> {
          MemberTag memberTag = new MemberTag();
          Tag tag = Tag.builder().tagId(memberTagDto.getTagId()).build();
          memberTag.addTag(tag);
          memberTag.addMember(member);
          return memberTag;
        }).collect(Collectors.toList());

    member.setName(requestBody.getName());
    member.setEmail(requestBody.getEmail());
    member.setPassword(requestBody.getPassword());
    member.setBirthday(requestBody.getBirthday());
    member.setIntroduce(requestBody.getIntroduce());
    member.setLocation(requestBody.getLocation());
    member.setGender(requestBody.getGender());
    member.setProfile(requestBody.getProfile());
    member.setMemberStatus(requestBody.getMemberStatus());
    member.setMemberTags(memberTags);

    return member;
  }

  default Member memberPatchToMember(MemberDto.Patch requestBody) {
    if (requestBody == null) {
      return null;
    }

//    Member.MemberBuilder member = Member.builder();
//
//    member.memberId(requestBody.getMemberId());
//    member.name(requestBody.getName());
//    member.introduce(requestBody.getIntroduce());
//    member.profile(requestBody.getProfile());
//    member.memberStatus(requestBody.getMemberStatus());
//    member.memberTags(requestBody.getMemberTags().stream()
//        .map(memberTagDto -> {
//          MemberTag memberTag = new MemberTag();
//          Tag tag = Tag.builder().tagId(memberTagDto.getTagId()).build();
//          memberTag.addTag(tag);
//          Member member1 = new Member();
//          member1.setMemberId(requestBody.getMemberId());
//          memberTag.addMember(member1);
//          return memberTag;
//        }).collect(Collectors.toList())
//    );
//
//    return member.build();

    if (requestBody == null) {
      return null;
    }
    Member member = new Member();
    member.setMemberId(requestBody.getMemberId());
    member.setName(requestBody.getName());
    member.setIntroduce(requestBody.getIntroduce());
    member.setProfile(requestBody.getProfile());
    member.setMemberStatus(requestBody.getMemberStatus());

    return member;
  }

  default MemberDto.Response memberToMemberResponse(Member member) {
    if (member == null) {
      return null;
    }

    int memberId = 0;
    String name = null;
    String email = null;
    Member.Gender gender = null;
    String location = null;
    String birthday = null;
    String profile = null;
    Member.MemberStatus memberStatus = null;

    memberId = (int) member.getMemberId();
    name = member.getName();
    email = member.getEmail();
    gender = member.getGender();
    location = member.getLocation();
    birthday = member.getBirthday();
    profile = member.getProfile();
    memberStatus = member.getMemberStatus();

    List<MemberLanguage> language = null;
    List<MemberTagResponseDto> tag = memberTagsToMemberTagResponses(member.getMemberTags());

    MemberDto.Response response = new MemberDto.Response(memberId, name, email, gender, location,
        birthday, profile, language, tag, memberStatus);

    return response;
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
