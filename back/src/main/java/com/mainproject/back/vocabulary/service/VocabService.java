package com.mainproject.back.vocabulary.service;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.member.exception.MemberExceptionCode;
import com.mainproject.back.util.ApiManager;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import com.mainproject.back.vocabulary.exception.VocabExceptionCode;
import com.mainproject.back.vocabulary.repository.VocabRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VocabService {

  private final VocabRepository vocabRepository;
  private final ApiManager apiManager;

  @Transactional
  public Vocabulary createVocab(Vocabulary vocab, String target) {
    // nation 추가
    String nation = apiManager.getWordLang(vocab.getWord());
    vocab.setNation(nation.equals("zh-CN") || nation.equals("zh-TW") ? "CN" : nation.toUpperCase());

    // 단어 뜻 번역
    String translated = apiManager.getWordMeaning(vocab.getWord(), target, nation);
    vocab.setMeaning(translated);

    Vocabulary savedVocab = vocabRepository.save(vocab);
    return savedVocab;
  }

  @Transactional
  public Vocabulary updateVocab(long memberId, Vocabulary vocab) {
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

  @Transactional
  public void deleteVocab(long vocabId) {
    Optional<Vocabulary> optionalBoard = vocabRepository.findById(vocabId);
    Vocabulary findVocab = optionalBoard
        .orElseThrow(() -> new BusinessLogicException(VocabExceptionCode.VOCAB_NOT_FOUND));
    vocabRepository.deleteById(vocabId);
  }

  public Vocabulary randomVocab(long memberId) {
    List<Vocabulary> page = vocabRepository.findAllByMemberIdOrderByRand(memberId);
    if (page.isEmpty()) {
      return null;
    }
    return page.get(0);
  }
}

