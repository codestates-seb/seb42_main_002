package com.mainproject.back.vocabulary.service;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.member.exception.MemberExceptionCode;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import com.mainproject.back.vocabulary.exception.VocabExceptionCode;
import com.mainproject.back.vocabulary.repository.VocabRepository;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class VocabService {

  public VocabService(VocabRepository vocabRepository) {
    this.vocabRepository = vocabRepository;
  }

  private VocabRepository vocabRepository;

  public Vocabulary createVocab(Vocabulary vocab) {
    log.info("## 단어장 추가: {}", vocab.getWord());
    Vocabulary savedVocab = vocabRepository.save(vocab);
    return savedVocab;
  }

  public Vocabulary updateVocab(long memberId, Vocabulary vocab) {
    log.info("## 단어장 수정: {}", vocab.getVocabId());
    Vocabulary findVocab = findVerifiedVocab(vocab.getVocabId());

    if (findVocab.getMember().getMemberId() != memberId) {
      throw new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_ALLOWED);
    }

    Optional.ofNullable(vocab.getWord())
        .ifPresent(findVocab::setWord);
    Optional.ofNullable(vocab.getNation())
        .ifPresent(findVocab::setNation);
    Optional.ofNullable(vocab.getMeaning())
        .ifPresent(findVocab::setMeaning);

    return vocabRepository.save(findVocab);
  }

  public Vocabulary findVerifiedVocab(long vocabId) {
    Optional<Vocabulary> optionalVocab = vocabRepository.findById(vocabId);
    Vocabulary findVocab = optionalVocab
        .orElseThrow(() -> new BusinessLogicException(VocabExceptionCode.VOCAB_NOT_FOUND));
    return findVocab;
  }

  public Page<Vocabulary> findVocabs(long memberId, Pageable pageable) {
    return vocabRepository.findAllByMemberId(memberId, pageable);
  }

  public void deleteVocab(long vocabId) {
    Optional<Vocabulary> optionalBoard = vocabRepository.findById(vocabId);
    Vocabulary findVocab = optionalBoard
        .orElseThrow(() -> new NoSuchElementException());
    vocabRepository.deleteById(vocabId);
  }

}
