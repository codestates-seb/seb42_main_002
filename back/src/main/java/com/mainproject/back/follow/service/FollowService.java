package com.mainproject.back.follow.service;


import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.follow.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FollowService {
  private final FollowRepository followRepository;



  public Follow createFollow(Follow follow) {
    return followRepository.save(follow);
  }

  public void deleteFollow(long followId) { followRepository.deleteById(followId);}

  public Page<Follow> findFollower(long memberId, Pageable pageable) { return followRepository.findAllFollowersByFollowingId(memberId, pageable); }


  public Page<Follow> findFollowing(long memberId, Pageable pageable) { return followRepository.findAllFollowingsByFollowerId(memberId, pageable); }


}
