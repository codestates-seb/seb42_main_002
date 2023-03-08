package com.mainproject.back.vocabulary.controller;

import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.vocabulary.dto.VocabDto;
import com.mainproject.back.vocabulary.dto.VocabDto.Response;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import com.mainproject.back.vocabulary.mapper.VocabMapper;
import com.mainproject.back.vocabulary.service.VocabService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/vocabs")
@Slf4j
public class VocabController {

  private MemberService memberService;
  private final VocabService vocabService;
  private final VocabMapper mapper;

  public VocabController(MemberService memberService,
      VocabService vocabService, VocabMapper mapper) {
    this.memberService = memberService;
    this.vocabService = vocabService;
    this.mapper = mapper;
  }


  @PostMapping
  public ResponseEntity postVocab(@RequestBody VocabDto.Post requestBody) {
    Member member = memberService.findMember(requestBody.getMemberId());

    Vocabulary vocab = mapper.vocabPostToVocab(requestBody);
    vocab.setMember(member);
    Vocabulary createdVocab = vocabService.createVocab(vocab);

    VocabDto.Response response = mapper.vocabToVocabResponse(createdVocab);

    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PatchMapping("/{vocab-id}")
  public ResponseEntity patchVocab(@PathVariable("vocab-id") long vocabId,
      @RequestBody VocabDto.Patch requestBody) {
    Vocabulary vocab = mapper.vocabPatchToVocab(requestBody);
    vocab.setVocabId(vocabId);
    Vocabulary updatedVocab = vocabService.updateVocab(vocab);

    VocabDto.Response response = mapper.vocabToVocabResponse(updatedVocab);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/{vocab-id}")
  public ResponseEntity getVocab(@PathVariable("vocab-id") long vocabId) {
    Vocabulary vocab = vocabService.findVerifiedVocab(vocabId);
    VocabDto.Response response = mapper.vocabToVocabResponse(vocab);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity getVocabs( @RequestParam int page) {
    long memberId = 1L; // 임시
    Page<Vocabulary> pageVocabs = vocabService.findVocabs(memberId, page);
    List<Vocabulary> vocabs = pageVocabs.getContent();
    List<Response> responses = mapper.vocabsToVocabResponses(vocabs);

    return new ResponseEntity<>(responses, HttpStatus.OK);
  }

  @DeleteMapping("/{vocab-id}")
  public ResponseEntity deleteVocab(@PathVariable("vocab-id") long vocabId) {
    vocabService.deleteVocab(vocabId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
