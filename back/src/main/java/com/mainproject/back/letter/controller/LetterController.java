package com.mainproject.back.letter.controller;

import com.mainproject.back.letter.dto.LetterCountDto;
import com.mainproject.back.letter.dto.LetterListDto;
import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.mapper.LetterMapper;
import com.mainproject.back.letter.service.LetterService;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.util.Check;
import com.mainproject.back.util.UriCreator;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/letters")
@Slf4j
@Validated
@RequiredArgsConstructor
public class LetterController {

  private final LetterService letterService;
  private final LetterMapper letterMapper;
  private final MemberService memberService;

  @PostMapping("/{receiver-id}")
  public ResponseEntity postLetter(@PathVariable("receiver-id") @Positive long receiverId,
      @RequestBody @Valid
      LetterPostDto letterPostDto, Principal principal) {
    log.info("## 편지 보내기: {}", receiverId);
    letterPostDto.setReceiverId(receiverId);

    Member member = memberService.findMemberByEmail(Check.checkPrincipal(principal));
    letterPostDto.setSenderId(member.getMemberId());

    Letter letter = letterMapper.LetterPostDtoToLetter(letterPostDto);
    Letter savedLetter = letterService.createLetter(letter);
    URI uri = UriCreator.createUri("/letter", savedLetter.getLetterId());
    return ResponseEntity.created(uri).build();
  }

  @GetMapping("/{letter-id}")
  public ResponseEntity getLetter(@PathVariable("letter-id") @Positive long letterId,
      Principal principal) {
    log.info("## 특정 편지 조회: {}", letterId);
    long memberId = memberService.findMemberIdByEmail(Check.checkPrincipal(principal));
    Letter findLetter = letterService.findLetter(letterId);
    LetterResponseDto letterResponseDto = letterMapper.LetterToLetterResponseDto(findLetter,
        memberId);
    return ResponseEntity.ok().body(letterResponseDto);
  }

  @GetMapping("/members/{member-id}")
  public ResponseEntity getLettersByMember(@PathVariable("member-id") @Positive long targetId,
      @PageableDefault Pageable pageable, Principal principal) {
    log.info("## 특정 멤버와 주고 받은 편지 리스트 조회: {}", targetId);
    long memberId = memberService.findMemberIdByEmail(Check.checkPrincipal(principal));
    Page<Letter> letterPage = letterService.findLettersByMemberAndTarget(targetId, pageable,
        memberId);
    Page<LetterListDto> letterListDtoPage = letterMapper.pageLetterToPageLetterListDtoPage(
        letterPage, memberId);
    return ResponseEntity.ok().body(letterListDtoPage);
  }

  @GetMapping()
  public ResponseEntity getMembersByLetter(Pageable pageable, Principal principal) {
    log.info("## 나와 편지를 주고 받은 멤버 리스트 조회");
    Page<MemberLetterDto> memberLetterDtoPage = letterService.findMembersByLetter(pageable,
        memberService.findMemberIdByEmail(Check.checkPrincipal(principal)));
    return ResponseEntity.ok().body(memberLetterDtoPage);
  }

  @GetMapping("/arrived")
  public ResponseEntity getArrivedLetterCount(Principal principal) {
    log.info("## 도착한 편지 개수 조회");
    LetterCountDto letterCountDto = letterService.getArrivedLettersCount(
        memberService.findMemberIdByEmail(Check.checkPrincipal(principal)));
    return ResponseEntity.ok().body(letterCountDto);
  }


}
