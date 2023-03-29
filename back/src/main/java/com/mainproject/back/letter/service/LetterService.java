package com.mainproject.back.letter.service;

import com.mainproject.back.block.service.BlockService;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.letter.dto.LetterCountDto;
import com.mainproject.back.letter.dto.LetterTranslateDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.entity.Nations;
import com.mainproject.back.letter.exception.LetterExceptionCode;
import com.mainproject.back.letter.repository.LetterRepository;
import com.mainproject.back.member.dto.MemberLetterInterface;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.entity.Member.MemberStatus;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.util.ApiManager;
import java.time.LocalDateTime;
import java.util.List;
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
  private final BlockService blockService;
  private final ApiManager apiManager;

  @Transactional
  public Letter createLetter(Letter letter) {
    // verify member id
    // verify receiver id
    Member sender = memberService.findMember(letter.getSender().getMemberId());
    Member receiver = memberService.findMember(letter.getReceiver().getMemberId());
    // 탈퇴 혹은 휴면계정한테 편지를 보낼 수 없음
    if (!receiver.getMemberStatus().equals(MemberStatus.MEMBER_ACTIVE)) {
      throw new BusinessLogicException(LetterExceptionCode.LETTER_NOT_ALLOWED);
    }
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
      long memberId) {
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

  public Page<MemberLetterInterface> findMembersByLetter(Pageable pageable, long memberId) {
    return letterRepository.findAllMemberLetterByMemberId(memberId, pageable);
  }

  public LetterCountDto getArrivedLettersCount(long memberId) {
    Long count;
    List<Long> blockIdList = blockService.findBlockIdList(memberId);
    if (blockIdList.isEmpty()) {
      count = letterRepository.countByIsReadAndReceiver(memberId);
    } else {
      count = letterRepository.countByIsReadAndReceiverAndBlock(memberId, blockIdList);
    }

    return new LetterCountDto(count);
  }

  public LetterTranslateDto translate(LetterTranslateDto letterTranslateDto) {
    String nation = apiManager.getWordLang(letterTranslateDto.getContent());
    String result = apiManager.getWordMeaning(letterTranslateDto.getContent(),
        letterTranslateDto.getTargetNation(), nation);
    letterTranslateDto.setContent(result);
    return letterTranslateDto;
  }
}
