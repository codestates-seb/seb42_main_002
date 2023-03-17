package com.mainproject.back.vocabulary.controller;

import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.util.UriCreator;
import com.mainproject.back.vocabulary.dto.VocabDto;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import com.mainproject.back.vocabulary.mapper.VocabMapper;
import com.mainproject.back.vocabulary.service.VocabService;
import java.net.URI;
import java.security.Principal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
  public ResponseEntity postVocab(@RequestBody VocabDto.Post requestBody, Principal principal) {
    log.info("## 단어 생성: {}", requestBody);
    log.info("## principal: {}", principal.getName());
    Member member = memberService.findMemberByEmail(principal.getName());

    Vocabulary vocab = mapper.vocabPostToVocab(requestBody);
    vocab.setMember(member);
    Vocabulary createdVocab = vocabService.createVocab(vocab);

    VocabDto.Response response = mapper.vocabToVocabResponse(createdVocab);

    URI uri = UriCreator.createUri("/vocabs", createdVocab.getVocabId());
    return ResponseEntity.created(uri).build();
  }

  @PatchMapping("/{vocab-id}")
  public ResponseEntity patchVocab(@PathVariable("vocab-id") long vocabId,
      @RequestBody VocabDto.Patch requestBody, Principal principal) {
    Member member = memberService.findMemberByEmail(principal.getName());
    requestBody.setVocabId(vocabId);
    Vocabulary vocab = mapper.vocabPatchToVocab(requestBody);
    Vocabulary updatedVocab = vocabService.updateVocab(member.getMemberId(), vocab);

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
  public ResponseEntity getVocabs(@PageableDefault Pageable pageable, Principal principal) {
    Member member = memberService.findMemberByEmail(principal.getName());
    Page<Vocabulary> pageVocabs = vocabService.findVocabs(member.getMemberId(), pageable);
    Page<VocabDto.Response> vocabResponseDto = mapper.pageVocabToPageVocabResponsePage(
        pageVocabs);
    return new ResponseEntity<>(vocabResponseDto, HttpStatus.OK);
  }

  @DeleteMapping("/{vocab-id}")
  public ResponseEntity deleteVocab(@PathVariable("vocab-id") long vocabId) {
    vocabService.deleteVocab(vocabId);
    return new ResponseEntity<>(HttpStatus.OK);
  }



  @GetMapping("/today/{vocab-id}")
  public ResponseEntity todayVocab(@PathVariable("vocab-id") long vocabId , @PageableDefault(size = 1 ) Pageable pageable) {
    Member member = memberService.findMember(vocabId);
    Page<Vocabulary> page = vocabService.todayVocab(member.getMemberId(), pageable);
    Page<VocabDto.Response> vocabResponseDto = mapper.pageVocabToPageVocabResponsePage(page);
    return new ResponseEntity<>(vocabResponseDto, HttpStatus.OK);
  }

  }


