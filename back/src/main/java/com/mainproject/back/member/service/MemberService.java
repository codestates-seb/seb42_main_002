package com.mainproject.back.member.service;


import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.dto.MemberTagDto;
import com.mainproject.back.member.dto.MemberTagPatchDto;
import com.mainproject.back.member.entity.Member;

import com.mainproject.back.member.repository.MemberRepository;
import com.mainproject.back.member.repository.MemberTagRepository;
import com.mainproject.back.member.tag.MemberTag;
import com.mainproject.back.tag.repository.TagRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class MemberService {

  private final MemberRepository memberRepository;
  private final MemberTagRepository memberTagRepository;
  private final TagRepository tagRepository;


  public Member createMember(Member member) {
    verifyExistsEmail(member.getEmail());
    return memberRepository.save(member);
  }

  @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
  public Member updateMember(MemberDto.Patch requestBody, Member member) {
    Member findMember = findVerifiedMember(member.getMemberId());

//    Optional.ofNullable(member.getName())
//        .ifPresent(name -> Member.builder().name(name).build());
//    Optional.ofNullable(member.getPassword())
//        .ifPresent(password -> Member.builder().password(password).build());
//    Optional.ofNullable(member.getMemberLanguages())
//            .ifPresent(memberLanguages -> Member.builder().memberLanguages(memberLanguages).build());
//    Optional.ofNullable(member.getMemberTags())
//        .ifPresent(memberTags -> Member.builder().memberTags(memberTags).build());
//    Optional.ofNullable(member.getIntroduce())
//            .ifPresent(introduce -> Member.builder().introduce(introduce).build());
//    Optional.ofNullable(member.getMemberStatus())
//        .ifPresent(memberStatus -> Member.builder().memberStatus(memberStatus).build());

    Optional.ofNullable(member.getName())
        .ifPresent(name -> findMember.setName(name));
    Optional.ofNullable(member.getIntroduce())
        .ifPresent(introduce -> findMember.setIntroduce(introduce));
    Optional.ofNullable(member.getMemberLanguages())
        .ifPresent(memberLanguages -> findMember.setMemberLanguages(memberLanguages));
    Optional.ofNullable(member.getProfile())
        .ifPresent(profile -> findMember.setProfile(profile));

    return memberRepository.save(findMember);
  }

  @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
  public Member updateMemberTag (long memberId, MemberTagPatchDto requestBody) {
//    List<MemberTag> findMembers = memberTagRepository.findAllByMemberId(memberId);

    Member findMember = findVerifiedMember(memberId);

    memberTagRepository.deleteAllByMember(findMember);

    for(MemberTagDto dto : requestBody.getMemberTags()){
      MemberTag memberTag = MemberTag.builder()
          .member(findMember)
          .tag(tagRepository.findById(dto.getTagId())).build();
      memberTagRepository.save(memberTag);
    }
    return findVerifiedMember(memberId);
  }

  @Transactional(readOnly = true)
  public Member findMember(long memberId) {
    return findVerifiedMember(memberId);
  }

  public void deleteMember(long memberId) {
    Member findMember = findVerifiedMember(memberId);

    memberRepository.delete(findMember);
  }

  @Transactional(readOnly = true)
  public Member findVerifiedMember(long memberId) {
    Optional<Member> optionalMember =
        memberRepository.findById(memberId);
    Member findMember =
        optionalMember.orElseThrow(() ->
            new RuntimeException("Not found "));
    return findMember;
  }

  private void verifyExistsEmail(String email) {
    Optional<Member> member = memberRepository.findByEmail(email);
    if (member.isPresent()) {
      throw new RuntimeException("MEMBER_EXISTS");
    }
  }

}
