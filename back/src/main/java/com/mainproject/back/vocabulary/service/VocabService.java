package com.mainproject.back.vocabulary.service;

import com.mainproject.back.vocabulary.entity.Vocabulary;
import com.mainproject.back.vocabulary.repository.VocabRepository;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class VocabService {

  public VocabService(VocabRepository vocabRepository) {
    this.vocabRepository = vocabRepository;
  }

  private VocabRepository vocabRepository;

  public Vocabulary createVocab(Vocabulary vocab) {
    Vocabulary savedVocab = vocabRepository.save(vocab);
    return savedVocab;
  }

  public Vocabulary updateVocab(Vocabulary vocab) {
    Vocabulary findVocab = findVerifiedVocab(vocab.getVocabId());

    Optional.ofNullable(vocab.getWord())
        .ifPresent(findVocab::setWord);
    Optional.ofNullable(vocab.getMeaning())
        .ifPresent(findVocab::setMeaning);

    return vocabRepository.save(findVocab);
  }

  public Vocabulary findVerifiedVocab(long vocabId) {
    Optional<Vocabulary> optionalVocab = vocabRepository.findById(vocabId);
    Vocabulary findVocab = optionalVocab
        .orElseThrow(() -> new NoSuchElementException());
    return findVocab;
  }

  public Page<Vocabulary> findVocabs(long memberId, int page){
    return vocabRepository.findAllByMemberId(memberId, PageRequest.of(page-1,15, Sort.by("vocab_id").descending()));
  }

  public void deleteVocab(long vocabId) {
    Optional<Vocabulary> optionalBoard = vocabRepository.findById(vocabId);
    Vocabulary findVocab = optionalBoard
        .orElseThrow(() -> new NoSuchElementException());
    vocabRepository.deleteById(vocabId);
  }

}
