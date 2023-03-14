package com.mainproject.back.follow.dto;

import com.mainproject.back.member.dto.MemberSimpleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class FollowDto {

  @Setter
  @Getter
  @AllArgsConstructor
  @NoArgsConstructor

  public static class Post {

    private Long followerId;

    private Long followingId;
  }

  @Builder
  @Getter
  @AllArgsConstructor
  public static class Response {

    private MemberSimpleDto follower;

    private MemberSimpleDto following;

  }


}
