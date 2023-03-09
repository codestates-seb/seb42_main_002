package com.mainproject.back.letter.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Builder
@AllArgsConstructor
@Getter
public class LetterSimpleDto {

  private LetterStatus status;
  private LocalDateTime createdAt;
  private Boolean isRead;

  @Getter
  @RequiredArgsConstructor
  public enum LetterStatus {
    SENT("sent letter"),
    RECEIVED("received letter");

    private final String message;
  }
}

