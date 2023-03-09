package com.mainproject.back.letter.dto;

import java.time.LocalDateTime;
import java.util.List;
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
  private List<String> pic;
  private LocalDateTime createdAt;
  private LocalDateTime availableAt;
}
