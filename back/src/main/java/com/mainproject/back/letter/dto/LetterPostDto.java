package com.mainproject.back.letter.dto;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class LetterPostDto {

  @Setter
  private long senderId;
  @Setter
  private long receiverId;
  private String title;
  private String body;
  private ArrayList<String> pic;

}
