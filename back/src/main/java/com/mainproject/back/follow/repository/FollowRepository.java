package com.mainproject.back.follow.repository;

import com.mainproject.back.follow.entity.Follow;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

  @Query(value = "select * from follow where following_id = :followingId", nativeQuery = true)
  public Page<Follow> findAllFollowersByFollowingId(Long followingId, Pageable pageable);

  @Query(value = "select * from follow where follower_id = :followerId", nativeQuery = true)
  public Page<Follow> findAllFollowingsByFollowerId(Long followerId, Pageable pageable);

  @Query("select ing.memberId from Follow f join f.follower ed join f.following ing where ed.memberId = :memberId")
  List<Long> findAllFollowingId(@Param("memberId") long memberId);

  Follow findByFollowerAndFollowing(Long follower, Long following);

  @Query("select f.followId from Follow f where f.followId = :id")
  Optional<Long> findFollowIdById(@Param("id") long followId);
}
