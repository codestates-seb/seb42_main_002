package com.mainproject.back.letter.dto;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LetterPostDto {

  @Setter
  private long senderId;
  @Setter
  private long receiverId;
  private String body;
  private ArrayList<String> photoUrl;
  private int type;

}
