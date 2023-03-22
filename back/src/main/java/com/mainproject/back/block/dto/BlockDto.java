package com.mainproject.back.block.dto;

import com.mainproject.back.member.dto.MemberSimpleDto;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class BlockDto {

  @Getter
  @AllArgsConstructor
  @Builder
  public static class Post {

    @NotNull
    private long targetId;
    private long memberId;
  }

  @Builder
  @Getter
  @AllArgsConstructor
  public static class Response {

    private MemberSimpleDto member;

    private MemberSimpleDto target;

  }
}

