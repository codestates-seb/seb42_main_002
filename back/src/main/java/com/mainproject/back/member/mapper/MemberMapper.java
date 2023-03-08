package com.mainproject.back.member.mapper;


import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.entity.Member;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
  Member memberPostToMember(MemberDto.Post requestBody);
  Member memberPatchToMember(MemberDto.Patch requestBody);
  MemberDto.Response memberToMemberResponse(Member member);
  List<MemberDto.Response> membersToMemberResponses(List<Member> members);

}
