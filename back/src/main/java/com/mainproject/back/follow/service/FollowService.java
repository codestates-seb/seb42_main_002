package com.mainproject.back.follow.service;


import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.follow.exception.FollowExceptionCode;
import com.mainproject.back.follow.repository.FollowRepository;
import com.mainproject.back.member.dto.MemberSearchDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FollowService {

  private final FollowRepository followRepository;
  private final MemberService memberService;


  public Follow createFollow(Follow follow) {
    return followRepository.save(follow);
  }

  public void deleteFollow(long followId) {
    long id = followRepository.findFollowIdById(followId)
        .orElseThrow(() -> new BusinessLogicException(
            FollowExceptionCode.FOLLOW_NOT_FOUND));
    followRepository.deleteById(id);
  }

  public Page<Follow> findFollower(long memberId, Pageable pageable) {
    return followRepository.findAllFollowersByFollowingId(memberId, pageable);
  }


  public Page<Follow> findFollowing(long memberId, Pageable pageable) {
    return followRepository.findAllFollowingsByFollowerId(memberId, pageable);
  }

  public Page<MemberSearchDto> convertToResponseDto(Page<Follow> followPage) {
    return followPage.map(follow -> {
      Member member = memberService.findMember(follow.getFollowing().getMemberId());
      return MemberSearchDto.builder().memberId(member.getMemberId()).name(member.getName())
          .location(member.getLocation()).profile(member.getProfile()).build();
    });
  }

}
