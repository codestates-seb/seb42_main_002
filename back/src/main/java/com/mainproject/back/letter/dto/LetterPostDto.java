package com.mainproject.back.letter.dto;

import java.util.ArrayList;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
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
  @NotBlank
  private String body;
  private ArrayList<String> photoUrl;
  @Default
  private int type = 1;

}
