package com.mainproject.back.follow.repository;

import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.member.dto.MemberLetterInterface;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

  @Query(value = "select * from follow where following_id = :followingId", nativeQuery = true)
  Page<Follow> findAllFollowersByFollowingId(Long followingId, Pageable pageable);

  @Query(value = "select m.member_id, m.name, m.location, m.profile, m.birthday, l.created_at, l.is_read, l.receiver_id, f.follower_id "
      + " from follow f join member m on f.following_id = m.member_id "
      + "left join letter l on (l.receiver_id = m.member_id or l.sender_id = m.member_id) and f.follower_id = :followerId "
      + "and l.created_at in (select MAX(l.created_at) as created_at from letter l group by l.receiver_id) "
      + "group by f.following_id order by l.created_at desc", nativeQuery = true)
  Page<MemberLetterInterface> findAllFollowingsByFollowerId(Long followerId, Pageable pageable);

  @Query("select ing.memberId from Follow f join f.follower ed join f.following ing where ed.memberId = :memberId")
  List<Long> findAllFollowingId(@Param("memberId") long memberId);

  @Query(value = "select f.follow_id from follow as f where f.following_id = :targetId and f.follower_id = :memberId", nativeQuery = true)
  Optional<Long> findFollowIdByUsers(@Param("memberId") long memberId,
      @Param("targetId") long targetId);
}
