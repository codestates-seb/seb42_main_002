package com.mainproject.back.follow.repository;

import com.mainproject.back.follow.entity.Follow;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FollowRepository extends JpaRepository<Follow, Long> {

  @Query(value = "select * from follow where following_id = :followingId", nativeQuery = true)
    public Page<Follow> findAllFollowersByFollowingId(Long followingId, Pageable pageable);
  @Query(value = "select * from follow where follower_id = :followerId", nativeQuery = true)
  public Page<Follow> findAllFollowingsByFollowerId(Long followerId, Pageable pageable);

    Follow findByFollowerAndFollowing(Long follower, Long following);
  }
