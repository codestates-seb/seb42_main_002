package com.mainproject.back.member.service;


import com.mainproject.back.member.entity.Member;

import com.mainproject.back.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class MemberService {
  private final MemberRepository memberRepository;


  public Member createMember(Member member) {
    verifyExistsEmail(member.getEmail());
    return memberRepository.save(member);
  }

  @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
  public Member updateMember(Member member) {
    Member findMember = findVerifiedMember(member.getMemberId());

    Optional.ofNullable(member.getName())
        .ifPresent(name -> Member.builder().name(name).build());
    Optional.ofNullable(member.getPassword())
        .ifPresent(password -> Member.builder().password(password).build());
    Optional.ofNullable(member.getMemberLanguages())
            .ifPresent(memberLanguages -> Member.builder().memberLanguages(memberLanguages).build());
    Optional.ofNullable(member.getMemberTags())
        .ifPresent(memberTags -> Member.builder().memberTags(memberTags).build());
    Optional.ofNullable(member.getIntroduce())
            .ifPresent(introduce -> Member.builder().introduce(introduce).build());
    Optional.ofNullable(member.getMemberStatus())
        .ifPresent(memberStatus -> Member.builder().memberStatus(memberStatus).build());

    return memberRepository.save(findMember);
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
    if (member.isPresent())
      throw new RuntimeException("MEMBER_EXISTS");
  }

}
