package com.mainproject.back.language.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class MemberLanguageDto {

  private long languageId;
  private String nation;
  private int level;
}
