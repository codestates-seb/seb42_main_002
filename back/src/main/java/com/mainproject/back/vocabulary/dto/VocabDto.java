package com.mainproject.back.vocabulary.dto;

import com.mainproject.back.member.dto.MemberSimpleDto;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.lang.Nullable;


public class VocabDto {


  @Getter
  @Builder
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Post {

    @NotNull
    @ApiModelProperty(example = "NOODLE")
    private String word;

    @ApiModelProperty(example = "US")
    private String targetNation;

    @ApiModelProperty(example = "국수")
    private String meaning;

  }

  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  @Getter
  public static class Patch {

    @Setter
    private long vocabId;

    @ApiModelProperty(example = "NOODLE")
    private String word;

    @ApiModelProperty(example = "US")
    @Nullable
    private String nation;

    @ApiModelProperty(example = "우동")
    private String meaning;
  }

  @AllArgsConstructor
  @Getter
  @Builder
  public static class Response {

    private long vocabId;
    private MemberSimpleDto member;
    private String nation;
    private String word;
    private String meaning;
    private LocalDateTime createdAt;
  }

}
