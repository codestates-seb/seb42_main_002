package com.mainproject.back.member.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@ApiModel("회원 차단")
public class MemberBlockDto {

  private Long memberId;
  private String name;
  private String profile;
  private String location;
}
