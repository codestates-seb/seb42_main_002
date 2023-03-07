package com.mainproject.back.letter.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LetterResponseDto {

  private long letterId;
  private String sender;
  private String receiver;
  private String title;
  private String body;
  private String pic;
  private LocalDateTime createdAt;

  // TODO 편지 읽기 가능한 시간
  //  private LocalDateTime availableAt;
}
