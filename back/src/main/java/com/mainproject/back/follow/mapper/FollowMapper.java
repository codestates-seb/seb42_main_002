package com.mainproject.back.follow.mapper;

import com.mainproject.back.follow.dto.FollowDto;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.member.dto.MemberSimpleDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FollowMapper {

  default Page<FollowDto.Response> pageFollowToPageFollowResponsePage(Page<Follow> followPage) {
    return followPage.map(this::followToFollowResponse);
  }

  default FollowDto.Response followToFollowResponse(Follow follow) {
    FollowDto.Response response = FollowDto.Response
        .builder()
        .following(MemberSimpleDto.builder().memberId(follow.getFollowing().getMemberId())
            .name(follow.getFollowing().getName()).memberStatus(follow.getFollowing().getMemberStatus()).build())
        .follower(MemberSimpleDto.builder().memberId(follow.getFollower().getMemberId())
            .name(follow.getFollower().getName()).memberStatus(follow.getFollower().getMemberStatus()).build())

        .build();
    return response;
  }
}
