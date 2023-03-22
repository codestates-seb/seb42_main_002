package com.mainproject.back.vocabulary.dto;

import com.mainproject.back.member.dto.MemberSimpleDto;
import com.sun.istack.NotNull;
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
    private String word;
    private String targetNation;
    private String meaning;

  }

  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  @Getter
  public static class Patch {

    @Setter
    private long vocabId;
    private String word;
    @Nullable
    private String nation;
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
