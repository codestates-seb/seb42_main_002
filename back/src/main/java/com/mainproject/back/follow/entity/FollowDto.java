package com.mainproject.back.follow.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class FollowDto {

  @Setter
  @Getter
  @AllArgsConstructor
  @NoArgsConstructor

  public static class Post {

    private Long followId;
    private Long follower;
    private Long following;
  }


}
