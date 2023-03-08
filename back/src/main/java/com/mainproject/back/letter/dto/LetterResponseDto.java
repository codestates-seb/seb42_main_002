package com.mainproject.back.letter.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class LetterResponseDto {

  private long letterId;
  @Setter
  private String sender;
  @Setter
  private String receiver;
  private String title;
  private String body;
  private String pic;
  private LocalDateTime createdAt;

  // TODO 편지 읽기 가능한 시간
    private LocalDateTime availableAt;
}
