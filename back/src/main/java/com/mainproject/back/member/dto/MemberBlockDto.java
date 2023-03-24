package com.mainproject.back.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberBlockDto {

  private Long memberId;
  private String name;
  private String profile;
  private String location;
}
