package com.mainproject.back.follow.entity;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByFollower(Long follower_id);

    List<Follow> findByFollowing(Long following_id);

    Follow findByFollowerAndFollowing(Long follower, Long following);
  }
