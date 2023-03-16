package com.mainproject.back.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class MemberBlockDto {

  private long memberId;
  private String name;
  private String profile;
  private String location;
}
