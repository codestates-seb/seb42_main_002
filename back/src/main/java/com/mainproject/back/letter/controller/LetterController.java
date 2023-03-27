package com.mainproject.back.letter.controller;

import com.mainproject.back.letter.dto.LetterCountDto;
import com.mainproject.back.letter.dto.LetterListDto;
import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.mapper.LetterMapper;
import com.mainproject.back.letter.service.LetterService;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.dto.MemberLetterInterface;
import com.mainproject.back.member.service.MemberConvertService;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.util.UriCreator;
import com.mainproject.back.util.Util;
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
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/users/me/letters")
@Slf4j
@Validated
@RequiredArgsConstructor
public class LetterController {

  private final LetterService letterService;
  private final LetterMapper letterMapper;
  private final MemberService memberService;
  private final MemberConvertService memberConvertService;

  @ApiOperation(value = "편지 보내기")
  @PostMapping
  public ResponseEntity postLetter(@RequestBody @Valid LetterPostDto letterPostDto,
      @ApiIgnore Principal principal) {
    log.info("## 편지 보내기: {}", letterPostDto.getReceiverId());

    Long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    letterPostDto.setSenderId(memberId);

    Letter letter = letterMapper.LetterPostDtoToLetter(letterPostDto);
    Letter savedLetter = letterService.createLetter(letter);
    URI uri = UriCreator.createUri("/letter", savedLetter.getLetterId());
    return ResponseEntity.created(uri).build();
  }
  @ApiOperation(value = "특정 편지 조회")
  @GetMapping(params = "letter")
  public ResponseEntity getLetter(@RequestParam("letter") @Positive long letterId,
      @ApiIgnore Principal principal) {
    log.info("## 특정 편지 조회: {}", letterId);
    long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Letter findLetter = letterService.findLetter(letterId);
    LetterResponseDto letterResponseDto = letterMapper.LetterToLetterResponseDto(findLetter,
        memberId);
    return ResponseEntity.ok().body(letterResponseDto);
  }
  @ApiOperation(value = "특정 멤버와 주고 받은 편지 리스트 조회")
  @GetMapping(params = "target")
  public ResponseEntity getLettersByMember(@RequestParam("target") @Positive long targetId,
      @PageableDefault @ApiIgnore Pageable pageable, @ApiIgnore Principal principal) {
    log.info("## 특정 멤버와 주고 받은 편지 리스트 조회: {}", targetId);
    long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Page<Letter> letterPage = letterService.findLettersByMemberAndTarget(targetId, pageable,
        memberId);
    Page<LetterListDto> letterListDtoPage = letterMapper.pageLetterToPageLetterListDtoPage(
        letterPage, memberId);
    return ResponseEntity.ok().body(letterListDtoPage);
  }

  @ApiOperation(value = "나와 편지를 주고 받은 멤버 리스트 조회")
  @GetMapping("/inbox")
  public ResponseEntity getMembersByLetter(@ApiIgnore Pageable pageable, @ApiIgnore Principal principal) {
    log.info("## 나와 편지를 주고 받은 멤버 리스트 조회");
    Page<MemberLetterInterface> memberLetterInterfacePage = letterService.findMembersByLetter(pageable,
        memberService.findMemberIdByEmail(Util.checkPrincipal(principal)));
    Page<MemberLetterDto> memberLetterDtoPage = memberConvertService.memberLetterToMemberLetterDtoPage(memberLetterInterfacePage);
    return ResponseEntity.ok().body(memberLetterDtoPage);
  }
  @ApiOperation(value = "도착한 편지 개수 조회")
  @GetMapping("/arrived")
  public ResponseEntity getArrivedLetterCount(@ApiIgnore Principal principal) {
    log.info("## 도착한 편지 개수 조회");
    LetterCountDto letterCountDto = letterService.getArrivedLettersCount(
        memberService.findMemberIdByEmail(Util.checkPrincipal(principal)));
    return ResponseEntity.ok().body(letterCountDto);
  }


}
