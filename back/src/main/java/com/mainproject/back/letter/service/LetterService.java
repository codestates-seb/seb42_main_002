package com.mainproject.back.letter.service;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.exception.LetterExceptionCode;
import com.mainproject.back.letter.repository.LetterRepository;
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

  @Transactional
  public Letter createLetter(Letter letter) {
    // verify member id
    // verify receiver id
    Letter savedLetter = letterRepository.save(letter);
    return savedLetter;
  }

  @Transactional
  public Letter findLetter(long letterId) {
    Optional<Letter> letterOptional = letterRepository.findById(letterId);
    Letter letter = letterOptional.orElseThrow(
        () -> new BusinessLogicException(LetterExceptionCode.LETTER_NOT_FOUND));
    if(!letter.getIsRead()) letter.setIsRead(true);
    Letter savedLetter = letterRepository.save(letter);
    return savedLetter;
  }

  public Page<Letter> findLetterByMember(long receiverId, Pageable pageable) {
    // TODO get memberId from principal
    long memberId = 1L;
    Page<Letter> letterPage = letterRepository.findLettersByMember(memberId, receiverId, pageable);
    return letterPage;
  }
}
