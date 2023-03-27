package com.mainproject.back.member.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@ApiModel("회원 추천")
public class MemberRecommendDto {

  private long memberId;
  private String name;
  private String profile;
}
