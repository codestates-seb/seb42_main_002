package com.mainproject.back.letter.service;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.entity.Nations;
import com.mainproject.back.letter.exception.LetterExceptionCode;
import com.mainproject.back.letter.repository.LetterRepository;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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
    if (!letter.getIsRead()) {
      letter.setIsRead(true);
    }
    Letter savedLetter = letterRepository.save(letter);
    return savedLetter;
  }

  public Page<Letter> findLetterByMember(long receiverId, Pageable pageable) {
    // TODO get memberId from principal
    long memberId = 1L;
    Page<Letter> letterPage = letterRepository.findLettersByMemberAndTarget(memberId, receiverId, pageable);
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

  public void findMembersByLetter(Pageable pageable){
    long memberId = 1L;
    // TODO get memberId from principal
    ArrayList<Letter> sentLetters = letterRepository.findSentLettersByMember(memberId);
    ArrayList<Letter> receivedLetters = letterRepository.findReceivedLettersByMember(memberId);
  }
}
