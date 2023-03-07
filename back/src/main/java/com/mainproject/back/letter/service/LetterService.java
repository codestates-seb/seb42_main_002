package com.mainproject.back.letter.service;

import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.repository.LetterRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class LetterService {

  private final LetterRepository letterRepository;

  public Letter createLetter(Letter letter) {
    // verify member id
    // verify receiver id
    Letter savedLetter = letterRepository.save(letter);
    return savedLetter;
  }

  public void removeLetter(long letterId) {
  }

  public Letter findLetter(long letterId) {
    Optional<Letter> letterOptional = letterRepository.findById(letterId);
    return letterOptional.orElseThrow();
  }

}
