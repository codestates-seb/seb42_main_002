package com.mainproject.back.member.dto;

import com.mainproject.back.letter.dto.LetterSimpleDto;
import java.util.Objects;
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
  private String birthday;
  private LetterSimpleDto lastLetter;

  @Override
  public int hashCode() {
    return Objects.hash(memberId);
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof MemberLetterDto) {
      MemberLetterDto dto = (MemberLetterDto) obj;
      return dto.getMemberId() == memberId;
    }
    return false;
  }
}
