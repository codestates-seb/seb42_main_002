package com.mainproject.back.follow.dto;

import com.mainproject.back.member.dto.MemberSimpleDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
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
  @ApiModel("팔로우 요청")
  public static class Post {
    @NotNull
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