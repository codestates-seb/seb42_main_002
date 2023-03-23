package com.mainproject.back.letter.service;

import com.mainproject.back.block.service.BlockService;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.letter.dto.LetterCountDto;
import com.mainproject.back.letter.dto.LetterSimpleDto;
import com.mainproject.back.letter.dto.LetterSimpleDto.LetterStatus;
import com.mainproject.back.letter.dto.LetterTranslateDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.entity.Nations;
import com.mainproject.back.letter.exception.LetterExceptionCode;
import com.mainproject.back.letter.repository.LetterRepository;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.util.ApiManager;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
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
  private final BlockService blockService;
  private final ApiManager apiManager;

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

  public Page<MemberLetterDto> findMembersByLetter(Pageable pageable, long memberId) {
    List<Long> blockIdList = blockService.findBlockIdList(memberId);
    Set<Letter> sentLetter = letterRepository.findSentLettersByMember(memberId);
    Set<Letter> receivedLetter = letterRepository.findReceivedLettersByMember(memberId);
    Set<MemberLetterDto> memberLetterDtoSet = sentLetter.stream()
        .filter(letter -> !blockIdList.contains(letter.getReceiver().getMemberId()))
        .map(letter -> {
          Member receiver = letter.getReceiver();
          return MemberLetterDto.builder().memberId(receiver.getMemberId())
              .name(receiver.getName())
              .birthday(receiver.getBirthday())
              .profile(receiver.getProfile())
              .location(receiver.getLocation())
              .lastLetter(
                  LetterSimpleDto.builder().isRead(letter.getIsRead()).status(LetterStatus.SENT)
                      .createdAt(letter.getCreatedAt()).build())
              .build();
        }).collect(Collectors.toSet());
    memberLetterDtoSet.addAll(receivedLetter.stream()
        .filter(letter -> !blockIdList.contains(letter.getSender().getMemberId()))
        .map(letter -> {
          Member sender = letter.getSender();
          return MemberLetterDto.builder().memberId(sender.getMemberId())
              .name(sender.getName())
              .profile(sender.getProfile())
              .birthday(sender.getBirthday())
              .location(sender.getLocation())
              .lastLetter(
                  LetterSimpleDto.builder().isRead(letter.getIsRead()).status(LetterStatus.RECEIVED)
                      .createdAt(letter.getCreatedAt()).build())
              .build();
        }).collect(Collectors.toSet()));
    int start = (int) pageable.getOffset();
    int end = Math.min((start + pageable.getPageSize()), memberLetterDtoSet.size());
    Comparator<MemberLetterDto> comparator = (o1, o2) -> {
      if (o1.getLastLetter().getCreatedAt().isAfter(o2.getLastLetter().getCreatedAt())) {
        return -1;
      } else if (o1.getLastLetter().getCreatedAt().isEqual(o2.getLastLetter().getCreatedAt())) {
        return 0;
      } else {
        return 1;
      }
    };

    List<MemberLetterDto> list = new ArrayList<>(memberLetterDtoSet);
    list.sort(comparator);

    Page<MemberLetterDto> memberLetterDtoPage = new PageImpl<>(list.subList(start, end), pageable,
        list.size());
    return memberLetterDtoPage;
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

  public Letter findLastLetter(long targetId, long memberId) {
    Page<Letter> letterPage = letterRepository.findLastLetterByMember(targetId, memberId,
        PageRequest.of(0, 1));
    if (letterPage.isEmpty()) {
      return null;
    }
    return letterPage.getContent().get(0);
  }

  public LetterTranslateDto translate(LetterTranslateDto letterTranslateDto) {
    String nation = apiManager.getWordLang(letterTranslateDto.getContent());
    String result = apiManager.getWordMeaning(letterTranslateDto.getContent(),
        letterTranslateDto.getTargetNation(), nation);
    letterTranslateDto.setContent(result);
    return letterTranslateDto;
  }
}
