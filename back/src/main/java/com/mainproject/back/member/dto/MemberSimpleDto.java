package com.mainproject.back.member.dto;

import com.mainproject.back.member.entity.Member;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@ApiModel("회원 심플")
public class MemberSimpleDto {

  private long memberId;
  private String name;
  private Member.MemberStatus memberStatus;
}
