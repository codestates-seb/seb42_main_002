package com.mainproject.back.member.service;


import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.exception.MemberExceptionCode;
import com.mainproject.back.member.repository.MemberRepository;
import com.mainproject.back.security.utils.AuthorityUtils;
import com.mainproject.back.tag.entity.Tag;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
@Service
public class MemberService {

  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthorityUtils authorityUtils;


  @Transactional
  public Member createMember(Member member) {
    verifyExistsEmail(member.getEmail());

    String encryptedPassword = passwordEncoder.encode(member.getPassword());
    member.setPassword(encryptedPassword);

    List<String> roles = authorityUtils.createRoles(member.getEmail());
    member.setRoles(roles);

    return memberRepository.save(member);
  }

  @Transactional
  public Member updateMember(Member member) {
    // member patch dto -> member
    // member patch dto : list<string> tag -> member : list<memberTag> tag
    // member -> find member 수정
    Member findMember = findVerifiedMember(member.getMemberId());
    Optional.ofNullable(member.getName())
        .ifPresent(findMember::setName);
    Optional.ofNullable(member.getIntroduce())
        .ifPresent(findMember::setIntroduce);
    Optional.ofNullable(member.getLocation()).ifPresent(findMember::setLocation);
    Optional.ofNullable(member.getProfile())
        .ifPresent(findMember::setProfile);
    Optional.ofNullable(member.getMemberLanguages())
        .ifPresent(findMember::setMemberLanguages);
    Optional.ofNullable(member.getMemberTags()).ifPresent(findMember::setMemberTags);
    Member savedMember = memberRepository.save(findMember);
    log.info("## updated member: {}", savedMember);
    return savedMember;
  }

//  @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
//  public Member updateMember(MemberDto.Patch requestBody, Member member) {
//    Member findMember = findVerifiedMember(member.getMemberId());

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

//    Optional.ofNullable(member.getName())
//        .ifPresent(findMember::setName);
//    Optional.ofNullable(member.getIntroduce())
//        .ifPresent(findMember::setIntroduce);
////    Optional.ofNullable(member.getMemberLanguages())
////        .ifPresent(findMember::setMemberLanguages);
//    Optional.ofNullable(member.getProfile())
//        .ifPresent(findMember::setProfile);
//
//
//
//    return memberRepository.save(findMember);
//  }

//  @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
//  public Member updateMemberTag(long memberId, MemberTagPatchDto requestBody) {
////    List<MemberTag> findMembers = memberTagRepository.findAllByMemberId(memberId);
//
//    Member findMember = findVerifiedMember(memberId);
//
//    memberTagRepository.deleteAllByMember(findMember);
//
//    for (MemberTagDto dto : requestBody.getMemberTags()) {
//      MemberTag memberTag = MemberTag.builder()
//          .member(findMember)
//          .tag(tagRepository.findById(dto.getTagId())).build();
//      memberTagRepository.save(memberTag);
//    }
//    return findVerifiedMember(memberId);
//  }

  public Member findMember(long memberId) {
    return findVerifiedMember(memberId);
  }

  public void deleteMember(long memberId) {
    Member findMember = findVerifiedMember(memberId);

    memberRepository.delete(findMember);
  }

  private Member findVerifiedMember(long memberId) {
    Optional<Member> optionalMember =
        memberRepository.findById(memberId);
    Member findMember =
        optionalMember.orElseThrow(() ->
            new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_FOUND));

    return findMember;
  }

  private void verifyExistsEmail(String email) {
    Optional<Member> member = memberRepository.findByEmail(email);
    if (member.isPresent()) {
      throw new BusinessLogicException(MemberExceptionCode.EMAIL_EXISTS);
    }
  }

  public Member findMemberByEmail(String email) {
    Optional<Member> optionalMember = memberRepository.findByEmail(email);

    Member findMember = optionalMember.orElseThrow(()
        -> new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_FOUND));
    return findMember;
  }

  public Page<Member> findRecommendedMember(long memberId, Pageable pageable) {
    Page<Member> memberPage = memberRepository.findRecommended(memberId, pageable);
    return memberPage;
  }

  public Page<Member> searchMembersByTag(List<Tag> tagList, Pageable pageable){
    Page<Member> memberPage = memberRepository.getMemberByTags(tagList, pageable);
    List<Member> distinct = memberPage.stream().filter(distinctByKey(Member::getMemberId)).collect(
        Collectors.toList());

    return new PageImpl<>(distinct, pageable, distinct.size());
  }
  public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
    Set<Object> seen = ConcurrentHashMap.newKeySet();
    return t -> seen.add(keyExtractor.apply(t));
  }
}
