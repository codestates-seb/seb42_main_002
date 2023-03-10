package com.mainproject.back.letter.entity;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Nations {

  KR_TO_US("KR", "US", 5, 0),
  US_TO_KR("US", "KR", 5, 0),
  KR_TO_JP("KR", "JP", 1, 0),
  JP_TO_KR("JP", "KR", 1, 0),
  KR_TO_CN("KR", "CN", 1, 30),
  CN_TO_KR("CN", "KR", 1, 30),
  KR_TO_ES("KR", "ES", 5, 0),
  ES_TO_KR("ES", "KR", 5, 0),
  US_TO_CN("EN", "CN", 5, 0),
  CN_TO_US("CN", "EN", 5, 0),
  US_TO_JP("EN", "JP", 4, 0),
  JP_TO_US("JP", "KR", 4, 0),
  US_TO_ES("EN", "JP", 4, 30),
  ES_TO_US("JP", "KR", 4, 30),
  CN_TO_JP("CN", "JP", 2, 15),
  JP_TO_CN("JP", "CN", 2, 15),
  CN_TO_ES("CN", "ES", 4, 0),
  ES_TO_CN("ES", "CN", 4, 0),
  JP_TO_ES("JP", "ES", 4, 0),
  ES_TO_JP("ES", "JP", 4, 0),
  ;

  private final String from;
  private final String to;
  private final int hour;
  private final int minute;
}
