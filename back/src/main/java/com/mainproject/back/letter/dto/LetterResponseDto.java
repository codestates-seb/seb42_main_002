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
  private long senderId;
  @Setter
  private String sender;
  @Setter
  private String receiver;
  private String body;
  private List<String> photoUrl;
  private int type;
  private LocalDateTime createdAt;
  private LocalDateTime availableAt;
}
