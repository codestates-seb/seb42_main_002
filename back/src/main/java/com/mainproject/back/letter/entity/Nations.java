package com.mainproject.back.letter.entity;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Nations {

  KR_TO_EN("KR", "EN", 5, 0),
  EN_TO_KR("EN", "KR", 5, 0),
  KR_TO_JP("KR", "JP", 1, 30)
  // 국가 추가
  ;

  private final String from;
  private final String to;
  private final int hour;
  private final int minute;
}
