package com.mainproject.back.block.dto;

import com.mainproject.back.member.dto.MemberSimpleDto;
import io.swagger.annotations.ApiModel;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class BlockDto {

  @Getter
  @AllArgsConstructor
  @Builder
  @NoArgsConstructor
  @ApiModel("차단요청")
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

