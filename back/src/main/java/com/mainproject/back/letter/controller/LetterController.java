package com.mainproject.back.letter.controller;

import com.mainproject.back.letter.dto.LetterListDto;
import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.mapper.LetterMapper;
import com.mainproject.back.letter.service.LetterService;
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
    log.info("## post letter: {}", receiverId);
    log.info("## letter post dto: {}", letterPostDto.getTitle());
    letterPostDto.setReceiverId(receiverId);
    // TODO get member id from principal
    letterPostDto.setSenderId(1L);
    Letter letter = letterMapper.LetterPostDtoToLetter(letterPostDto);
    Letter savedLetter = letterService.createLetter(letter);
    LetterResponseDto letterResponseDto = letterMapper.LetterToLetterResponseDto(savedLetter);
    URI uri = UriCreator.createUri("/letter", savedLetter.getLetterId());
    return ResponseEntity.created(uri).body(letterResponseDto);
  }

  @GetMapping("/{letter-id}")
  public ResponseEntity getLetter(@PathVariable("letter-id") long letterId) {
    Letter findLetter = letterService.findLetter(letterId);
    LetterResponseDto letterResponseDto = letterMapper.LetterToLetterResponseDto(findLetter);
    return ResponseEntity.ok().body(letterResponseDto);
  }

  @GetMapping("/members/{member-id}")
  public ResponseEntity getLettersByMember(@PathVariable("member-id") long targetId, @PageableDefault Pageable pageable) {
    log.info("## 특정 멤버와 주고 받은 편지 리스트 : {}", targetId);
    Page<Letter> letterPage = letterService.findLetterByMember(targetId, pageable);
    Page<LetterListDto> letterListDtoPage = letterMapper.pageLetterToPageLetterListDtoPage(letterPage);
    return ResponseEntity.ok().body(letterListDtoPage);
  }



}
