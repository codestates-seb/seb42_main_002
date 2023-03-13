package com.mainproject.back.block.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.mainproject.back.member.dto.MemberSimpleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class BlockDto {

  @Getter
  @Setter
  @AllArgsConstructor
  @JsonInclude(Include.NON_NULL)
  public static class Post {

    private long memberId;

    private long targetId;

  }

  @Builder
  @Getter
  @AllArgsConstructor
  public static class Response {

    private MemberSimpleDto member;

    private MemberSimpleDto target;

  }
}

