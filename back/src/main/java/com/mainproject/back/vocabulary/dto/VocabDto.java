package com.mainproject.back.vocabulary.dto;

import com.sun.istack.NotNull;
import java.time.LocalDateTime;
import javax.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


public class VocabDto {


  @Getter
  public static class Post {
    @NotNull
    private String word;
    @Setter
    private String meaning;
    @Setter
    private String langCode;
    @Setter
    private long memberId;
  }

  @AllArgsConstructor
  @Getter
  public static class Patch {

    private String word;
    private String meaning;
  }

  @AllArgsConstructor
  @Getter
  @Builder
  public static class Response {

    private long vocabId;
    private long memberId;
    private String langCode;
    private String word;
    private String meaning;
    private LocalDateTime createdAt;
  }

}
