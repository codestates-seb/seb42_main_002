package com.mainproject.back.vocabulary.controller;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.exception.MemberExceptionCode;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.util.UriCreator;
import com.mainproject.back.util.Util;
import com.mainproject.back.vocabulary.dto.VocabDto;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import com.mainproject.back.vocabulary.mapper.VocabMapper;
import com.mainproject.back.vocabulary.service.VocabService;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import java.security.Principal;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
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
import springfox.documentation.annotations.ApiIgnore;

@Validated
@RestController
@RequestMapping("/vocabs")
@RequiredArgsConstructor
@Slf4j
public class VocabController {

  private final MemberService memberService;
  private final VocabService vocabService;
  private final VocabMapper mapper;

  @ApiOperation(value = "단어 생성")
  @PostMapping
  public ResponseEntity postVocab(@RequestBody @Valid VocabDto.Post requestBody, @ApiIgnore Principal principal) {
    log.info("## 단어 생성: {}", requestBody);
    Member member = memberService.findMemberByEmail(Util.checkPrincipal(principal));

    Vocabulary vocab = mapper.vocabPostToVocab(requestBody);
    vocab.setMember(member);
    Vocabulary createdVocab = vocabService.createVocab(vocab, requestBody.getTargetNation() == null ? "" : requestBody.getTargetNation());

    VocabDto.Response response = mapper.vocabToVocabResponse(createdVocab);

    URI uri = UriCreator.createUri("/vocabs", createdVocab.getVocabId());
    return ResponseEntity.created(uri).body(response);
  }
  @ApiOperation(value = "단어 수정")
  @PatchMapping("/{vocab-id}")
  public ResponseEntity patchVocab(@PathVariable("vocab-id") @Positive long vocabId,
      @RequestBody VocabDto.Patch requestBody, @ApiIgnore Principal principal) {
    log.info("## 단어 수정: {}", requestBody);
    Long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    requestBody.setVocabId(vocabId);
    Vocabulary vocab = mapper.vocabPatchToVocab(requestBody);
    Vocabulary updatedVocab = vocabService.updateVocab(memberId, vocab);

    VocabDto.Response response = mapper.vocabToVocabResponse(updatedVocab);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  @ApiOperation(value = "특정 단어 조회")
  @GetMapping("/{vocab-id}")
  public ResponseEntity getVocab(@PathVariable("vocab-id") @Positive long vocabId) {
    log.info("## 특정 단어 생성: {}", vocabId);
    Vocabulary vocab = vocabService.findVerifiedVocab(vocabId);
    VocabDto.Response response = mapper.vocabToVocabResponse(vocab);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  @ApiOperation(value = "전체 단어 조회")
  @GetMapping
  public ResponseEntity getVocabs(@PageableDefault @ApiIgnore Pageable pageable, @ApiIgnore Principal principal) {
    log.info("## 전체 단어 조회: {}", principal);
    if (principal.getName() == null) {
      throw new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_FOUND);
    }
    long member = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Page<Vocabulary> pageVocabs = vocabService.findVocabs(member, pageable);
    Page<VocabDto.Response> vocabResponseDto = mapper.pageVocabToPageVocabResponsePage(
        pageVocabs);
    return new ResponseEntity<>(vocabResponseDto, HttpStatus.OK);
  }
  @ApiOperation(value = "단어 삭제")
  @DeleteMapping("/{vocab-id}")
  public ResponseEntity deleteVocab(@PathVariable("vocab-id") @Positive long vocabId) {
    log.info("## 단어 삭제: {}", vocabId);
    vocabService.deleteVocab(vocabId);
    return new ResponseEntity<>(HttpStatus.OK);
  }


  @ApiOperation(value = "랜덤 단어 생성")
  @GetMapping("/random")
  public ResponseEntity randomVocab(@ApiIgnore Principal principal) {
    log.info("## 랜덤 단어 생성: {}", principal);
    long member = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Vocabulary vocab = vocabService.randomVocab(member);
    if (vocab == null) {
      return ResponseEntity.noContent().build();
    }
    VocabDto.Response vocabResponseDto = mapper.vocabToResponse(vocab);
    return new ResponseEntity<>(vocabResponseDto, HttpStatus.OK);
  }

}


