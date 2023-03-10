package com.mainproject.back.block.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AllArgsConstructor;
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
}

