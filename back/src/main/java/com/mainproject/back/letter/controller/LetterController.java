package com.mainproject.back.letter.controller;

import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.mapper.LetterMapper;
import com.mainproject.back.letter.service.LetterService;
import com.mainproject.back.util.UriCreator;
import java.net.URI;
import javax.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity postLetter(@PathParam("receiver-id") long receiverId, @RequestBody
  LetterPostDto letterPostDto) {
    letterPostDto.setReceiverId(receiverId);
    // TODO member id from principal
    letterPostDto.setMemberId(1L);
    Letter letter = letterMapper.LetterPostDtoToLetter(letterPostDto);
    Letter savedLetter = letterService.createLetter(letter);
    LetterResponseDto letterResponseDto = letterMapper.LetterToLetterResponseDto(savedLetter);
    // TODO ResponseDto 변환
    URI uri = UriCreator.createUri("/letter", savedLetter.getLetterId());
    return ResponseEntity.created(uri).body(letterResponseDto);
  }
}
