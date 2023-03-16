package com.mainproject.back.follow.service;


import com.mainproject.back.block.entity.Block;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.follow.exception.FollowExceptionCode;
import com.mainproject.back.follow.repository.FollowRepository;
import com.mainproject.back.letter.dto.LetterSimpleDto;
import com.mainproject.back.letter.dto.LetterSimpleDto.LetterStatus;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import java.util.List;
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

  public List<Long> findFollowingId(long memberId){
    return followRepository.findAllFollowingId(memberId);
  }


}
