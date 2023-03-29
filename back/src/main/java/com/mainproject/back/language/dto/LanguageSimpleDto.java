package com.mainproject.back.language.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LanguageSimpleDto {

  private Long languageId;
  private String nation;
}
