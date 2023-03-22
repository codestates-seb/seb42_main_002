package com.mainproject.back.follow.service;


import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.follow.exception.FollowExceptionCode;
import com.mainproject.back.follow.repository.FollowRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FollowService {

  private final FollowRepository followRepository;

  @Transactional
  public Follow createFollow(Follow follow) {
    followRepository.findFollowIdByUsers(follow.getFollower().getMemberId(),
        follow.getFollowing().getMemberId()).ifPresent(f -> {
      throw new BusinessLogicException(FollowExceptionCode.FOLLOW_EXISTS);
    });
    return followRepository.save(follow);
  }

  @Transactional
  public void deleteFollow(long followingId, long memberId) {
    Long findFollow = followRepository.findFollowIdByUsers(memberId, followingId)
        .orElseThrow(() -> new BusinessLogicException(
            FollowExceptionCode.FOLLOW_NOT_FOUND));
    followRepository.deleteById(findFollow);
  }

  @Transactional
  public void deleteFollowByBlock(long memberId, long targetId) {
    Optional<Long> optionalFollowId = followRepository.findFollowIdByUsers(memberId, targetId);
    optionalFollowId.ifPresent(followRepository::deleteById);
  }

  public Page<Follow> findFollower(long memberId, Pageable pageable) {
    return followRepository.findAllFollowersByFollowingId(memberId, pageable);
  }


  public Page<Follow> findFollowing(long memberId, Pageable pageable) {
    return followRepository.findAllFollowingsByFollowerId(memberId, pageable);
  }

  public List<Long> findFollowingId(long memberId) {
    return followRepository.findAllFollowingId(memberId);
  }


}
