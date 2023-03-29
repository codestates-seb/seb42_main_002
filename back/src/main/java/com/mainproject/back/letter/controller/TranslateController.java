package com.mainproject.back.letter.controller;

import com.mainproject.back.letter.dto.LetterTranslateDto;
import com.mainproject.back.letter.service.LetterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TranslateController {

  private final LetterService letterService;

  @PostMapping("/translate")
  public ResponseEntity<Object> getTranslated(@RequestBody LetterTranslateDto body) {
    log.info("## 편지 번역");
    LetterTranslateDto result = letterService.translate(body);
    return ResponseEntity.ok().body(result);
  }
}
