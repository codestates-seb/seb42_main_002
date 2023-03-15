package com.mainproject.back.vocabulary.dto;

import com.mainproject.back.member.dto.MemberSimpleDto;
import com.sun.istack.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


public class VocabDto {


  @Getter
  @ToString
  public static class Post {
    @NotNull
    private String word;
    @Setter
    private String meaning;
    @Setter
    private String nation;
    @Setter
    private long memberId;
  }

  @AllArgsConstructor
  @Getter
  public static class Patch {

    @Setter
    private long vocabId;
    private String word;
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
