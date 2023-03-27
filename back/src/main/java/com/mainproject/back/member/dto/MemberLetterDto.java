package com.mainproject.back.member.dto;

import com.mainproject.back.letter.dto.LetterSimpleDto;
import com.mainproject.back.member.entity.Member;
import io.swagger.annotations.ApiModel;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
@ApiModel("회원 편지")
public class MemberLetterDto {

  private long memberId;
  private String name;
  private String location;
  private String profile;
  private String birthday;
  private Member.MemberStatus memberStatus;
  private Boolean isRead;
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
