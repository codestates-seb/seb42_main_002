package com.mainproject.back.member.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@ApiModel("회원 검색")
public class MemberSearchDto {

  private long memberId;
  private String name;
  private String profile;
  private String location;
  @Setter
  private boolean isFriend;
}
