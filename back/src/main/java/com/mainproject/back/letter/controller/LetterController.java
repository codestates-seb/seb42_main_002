package com.mainproject.back.letter.controller;

import com.mainproject.back.letter.dto.LetterCountDto;
import com.mainproject.back.letter.dto.LetterListDto;
import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.mapper.LetterMapper;
import com.mainproject.back.letter.service.LetterService;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.util.UriCreator;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/letters")
@Slf4j
@RequiredArgsConstructor
public class LetterController {

  private final LetterService letterService;
  private final LetterMapper letterMapper;

  @PostMapping("/{receiver-id}")
  public ResponseEntity postLetter(@PathVariable("receiver-id") long receiverId, @RequestBody
  LetterPostDto letterPostDto) {
    log.info("## 편지 보내기: {}", receiverId);
    log.info("## letter post dto: {}", letterPostDto.getTitle());
    letterPostDto.setReceiverId(receiverId);
    // TODO get member id from principal
    letterPostDto.setSenderId(1L);
    Letter letter = letterMapper.LetterPostDtoToLetter(letterPostDto);
    Letter savedLetter = letterService.createLetter(letter);
    URI uri = UriCreator.createUri("/letter", savedLetter.getLetterId());
    return ResponseEntity.created(uri).build();
  }

  @GetMapping("/{letter-id}")
  public ResponseEntity getLetter(@PathVariable("letter-id") long letterId) {
    log.info("## 특정 편지 조회: {}", letterId);
    Letter findLetter = letterService.findLetter(letterId);
    LetterResponseDto letterResponseDto = letterMapper.LetterToLetterResponseDto(findLetter);
    return ResponseEntity.ok().body(letterResponseDto);
  }

  @GetMapping("/members/{member-id}")
  public ResponseEntity getLettersByMember(@PathVariable("member-id") long targetId,
      @PageableDefault Pageable pageable) {
    log.info("## 특정 멤버와 주고 받은 편지 리스트 조회: {}", targetId);
    Page<Letter> letterPage = letterService.findLettersByMemberAndTarget(targetId, pageable);
    Page<LetterListDto> letterListDtoPage = letterMapper.pageLetterToPageLetterListDtoPage(
        letterPage);
    return ResponseEntity.ok().body(letterListDtoPage);
  }

  @GetMapping()
  public ResponseEntity getMembersByLetter(@PageableDefault(sort = "lastLetter.createdAt") Pageable pageable) {
    log.info("## 나와 편지를 주고 받은 멤버 리스트 조회");
    Page<MemberLetterDto> memberLetterDtoPage = letterService.findMembersByLetter(pageable);
    return ResponseEntity.ok().body(memberLetterDtoPage);
  }

  @GetMapping("/arrived")
  public ResponseEntity getArrivedLetterCount() {
    log.info("## 도착한 편지 개수 조회");
    LetterCountDto letterCountDto = letterService.getArrivedLettersCount();
    return ResponseEntity.ok().body(letterCountDto);
  }
}