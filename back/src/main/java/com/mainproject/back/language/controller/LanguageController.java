package com.mainproject.back.language.controller;

import com.mainproject.back.language.dto.LanguageSimpleDto;
import com.mainproject.back.language.service.LanguageService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/languages")
@RequiredArgsConstructor
@Slf4j
public class LanguageController {

  private final LanguageService languageService;

  @GetMapping
  public ResponseEntity getAllLanguages() {
    log.info("## 모든 언어 조회");
    List<LanguageSimpleDto> languages = languageService.findAllSimpleLanguages();
    return ResponseEntity.ok().body(languages);
  }
}
