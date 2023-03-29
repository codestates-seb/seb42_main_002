package com.mainproject.back.member.dto;

import com.mainproject.back.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberSimpleDto {

  private long memberId;
  private String name;
  private Member.MemberStatus memberStatus;
}
