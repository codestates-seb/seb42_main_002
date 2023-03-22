package com.mainproject.back.letter.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@AllArgsConstructor
public class LetterTranslateDto {

  @Setter
  private String content;
  private String targetNation;
}
