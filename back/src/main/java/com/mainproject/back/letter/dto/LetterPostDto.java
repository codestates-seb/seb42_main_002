package com.mainproject.back.letter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class LetterPostDto {

  @Setter
  private long memberId;
  @Setter
  private long receiverId;
  private String title;
  private String body;
  private String pic;

}
