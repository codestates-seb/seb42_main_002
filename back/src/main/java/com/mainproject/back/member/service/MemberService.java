package com.mainproject.back.member.service;


import com.mainproject.back.block.service.BlockService;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.follow.service.FollowService;
import com.mainproject.back.language.entity.Language;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.exception.MemberExceptionCode;
import com.mainproject.back.member.repository.MemberRepository;
import com.mainproject.back.security.utils.AuthorityUtils;
import com.mainproject.back.tag.entity.Tag;
import java.util.ArrayList;
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
  private final FollowService followService;
  private final BlockService blockService;


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
    Member findMember = findVerifiedMember(member.getMemberId());
    Optional.ofNullable(member.getName())
        .ifPresent(findMember::setName);
    Optional.ofNullable(member.getIntroduce())
        .ifPresent(findMember::setIntroduce);
    Optional.ofNullable(member.getLocation()).ifPresent(findMember::setLocation);
    Optional.ofNullable(member.getProfile())
        .ifPresent(findMember::setProfile);
    Optional.ofNullable(member.getGender()).ifPresent(findMember::setGender);
    if (!member.getMemberLanguages().isEmpty()) {
      findMember.setMemberLanguages(member.getMemberLanguages());
    }
    if (!member.getMemberTags().isEmpty()) {
      findMember.setMemberTags(member.getMemberTags());
    }
    Member savedMember = memberRepository.save(findMember);
    log.info("## updated member: {}", savedMember);
    return savedMember;
  }

  public Member findMember(long memberId) {
    return findVerifiedMember(memberId);
  }

  @Transactional
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

  public Long findMemberIdByEmail(String email) {
    return memberRepository.findMemberIdByEmail(email)
        .orElseThrow(() -> new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_FOUND));
  }

  public Page<Member> findRecommendedMember(long memberId, Pageable pageable) {
    Page<Member> memberPage = memberRepository.findRecommended(memberId, pageable);
    List<Long> followingIdList = followService.findFollowingId(memberId);
    List<Long> blockIdList = blockService.findBlockIdList(memberId);

    List<Member> result = memberPage.stream()
        .filter(member -> !followingIdList.contains(member.getMemberId()) &&
            !blockIdList.contains(member.getMemberId()))
        .collect(Collectors.toList());

    return new PageImpl<>(result, pageable, result.size());
  }

  public Page<Member> searchMembersByTag(List<Tag> tagList, List<Language> languageList,
      Pageable pageable, long memberId) {
    Page<Member> memberPage;
    if (tagList.isEmpty() && !languageList.isEmpty()) {
      memberPage = memberRepository.getMemberByLang(languageList, pageable);
    } else if (languageList.isEmpty() && !tagList.isEmpty()) {
      memberPage = memberRepository.getMemberByTags(tagList, pageable);
    } else {
      memberPage = memberRepository.getMemberByTagsAndLang(tagList, languageList, pageable);
    }

    List<Long> blockIdList =
        memberId == 0 ? new ArrayList<>() : blockService.findBlockIdList(memberId);

    List<Member> distinct = memberPage.stream().filter(distinctByKey(Member::getMemberId))
        .filter(member -> member.getMemberId() != memberId)
        .filter(member -> !blockIdList.contains(member.getMemberId()))
        .collect(Collectors.toList());

    return new PageImpl<>(distinct, pageable, distinct.size());
  }

  public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
    Set<Object> seen = ConcurrentHashMap.newKeySet();
    return t -> seen.add(keyExtractor.apply(t));
  }


}
