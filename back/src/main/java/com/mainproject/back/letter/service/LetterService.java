package com.mainproject.back.letter.service;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.letter.dto.LetterCountDto;
import com.mainproject.back.letter.dto.LetterSimpleDto;
import com.mainproject.back.letter.dto.LetterSimpleDto.LetterStatus;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.entity.Nations;
import com.mainproject.back.letter.exception.LetterExceptionCode;
import com.mainproject.back.letter.repository.LetterRepository;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LetterService {

  private final LetterRepository letterRepository;
  private final MemberService memberService;

  @Transactional
  public Letter createLetter(Letter letter) {
    // verify member id
    // verify receiver id
    Member sender = memberService.findMember(letter.getSender().getMemberId());
    Member receiver = memberService.findMember(letter.getReceiver().getMemberId());
    letter.setAvailableAt(calculateTime(sender, receiver));
    letter.setSender(sender);
    letter.setReceiver(receiver);
    Letter savedLetter = letterRepository.save(letter);
    return savedLetter;
  }

  @Transactional
  public Letter findLetter(long letterId) {
    Optional<Letter> letterOptional = letterRepository.findById(letterId);
    Letter letter = letterOptional.orElseThrow(
        () -> new BusinessLogicException(LetterExceptionCode.LETTER_NOT_FOUND));

    if (!letter.getIsRead() && letter.getAvailableAt().isBefore(LocalDateTime.now())) {
      letter.setIsRead(true);
    }
    Letter savedLetter = letterRepository.save(letter);
    return savedLetter;
  }

  public Page<Letter> findLettersByMemberAndTarget(long targetId, Pageable pageable,
      Principal principal) {
    long memberId = memberService.findMemberByEmail(principal.getName()).getMemberId();
    Page<Letter> letterPage = letterRepository.findLettersByMemberAndTarget(memberId, targetId,
        pageable);
    return letterPage;
  }

  private LocalDateTime calculateTime(Member sender, Member receiver) {
    for (Nations nation : Nations.values()) {
      if (nation.getFrom().equals(sender.getLocation()) && nation.getTo()
          .equals(receiver.getLocation())) {
        return LocalDateTime.now().plusHours(nation.getHour()).plusMinutes(nation.getMinute());
      }
    }
    return LocalDateTime.now();
  }

  public Page<MemberLetterDto> findMembersByLetter(Pageable pageable, long memberId) {
    Set<Letter> sentLetter = letterRepository.findSentLettersByMember(memberId);
    Set<Letter> receivedLetter = letterRepository.findReceivedLettersByMember(memberId);
    Set<MemberLetterDto> memberLetterDtoSet = sentLetter.stream().map(letter -> {
      Member receiver = letter.getReceiver();
      return MemberLetterDto.builder().memberId(receiver.getMemberId())
          .name(receiver.getName())
          .profile(receiver.getProfile())
          .location(receiver.getLocation())
          .lastLetter(LetterSimpleDto.builder().isRead(letter.getIsRead()).status(LetterStatus.SENT)
              .createdAt(letter.getCreatedAt()).build())
          .build();
    }).collect(Collectors.toSet());
    memberLetterDtoSet.addAll(receivedLetter.stream().map(letter -> {
      Member sender = letter.getSender();
      return MemberLetterDto.builder().memberId(sender.getMemberId())
          .name(sender.getName())
          .profile(sender.getProfile())
          .location(sender.getLocation())
          .lastLetter(
              LetterSimpleDto.builder().isRead(letter.getIsRead()).status(LetterStatus.RECEIVED)
                  .createdAt(letter.getCreatedAt()).build())
          .build();
    }).collect(Collectors.toSet()));
    Page<MemberLetterDto> memberLetterDtoPage = new PageImpl<>(new ArrayList<>(memberLetterDtoSet),
        pageable, memberLetterDtoSet.size());
    return memberLetterDtoPage;
  }

  public LetterCountDto getArrivedLettersCount(long memberId) {
    Long count = letterRepository.countByIsReadAndReceiver(memberId);
    return new LetterCountDto(count);
  }

  public Letter findLastLetter(long targetId, long memberId) {
    Page<Letter> letterPage = letterRepository.findLastLetterByMember(targetId, memberId,
        PageRequest.of(0, 1));
    if(letterPage.isEmpty()) return null;
    return letterPage.getContent().get(0);
  }
}
