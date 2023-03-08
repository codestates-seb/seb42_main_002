package com.mainproject.back.member.dto;

import com.mainproject.back.letter.dto.LetterSimpleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class MemberLetterDto {

  private long memberId;
  private String name;
  private String location;
  private String profile;
  private LetterSimpleDto lastLetter;
}
