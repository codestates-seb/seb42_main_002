package com.mainproject.back.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class MemberSearchDto {

  private long memberId;
  private String name;
  private String profile;
  private String location;
  @Setter
  private boolean isFriend;
}
