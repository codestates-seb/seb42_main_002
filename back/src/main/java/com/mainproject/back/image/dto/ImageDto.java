package com.mainproject.back.image.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ImageDto {

  private String originalName;
  private String uploadName;
  private String uploadPath;
  private String uploadUrl;
}
