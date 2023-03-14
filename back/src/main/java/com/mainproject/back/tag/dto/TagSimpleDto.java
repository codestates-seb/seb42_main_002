package com.mainproject.back.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class TagSimpleDto {

  private long tagId;
  private String name;
}
