package com.mainproject.back.follow.repository;

import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.member.dto.FollowMemberInterface;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

  @Query(value = "select * from follow where following_id = :followingId and member_status = \"MEMBER_ACTIVE\" ", nativeQuery = true)
  Page<Follow> findAllFollowersByFollowingId(Long followingId, Pageable pageable);

  @Query(value = "select m.member_id, m.name, m.location, m.profile, m.birthday, m.member_status, "
      + "l.created_at, (select q.is_read from letter q where q.letter_id = l.letter_id) as is_read, l.receiver_id, f.follower_id "
      + "from follow f join member m on f.following_id = m.member_id "
      + "left join letter l on ((l.receiver_id = m.member_id or l.sender_id = m.member_id) "
      + "and (l.receiver_id = f.follower_id or l.sender_id = f.follower_id)) "
      + "where f.follower_id = :followerId and m.member_status = \"MEMBER_ACTIVE\" group by f.following_id "
      + "order by l.created_at desc",
      countQuery = "select count(m.member_id) from follow f join member m on f.following_id = m.member_id "
          + "left join letter l on (l.receiver_id = m.member_id or l.sender_id = m.member_id) and (l.receiver_id = f.follower_id or l.sender_id = f.follower_id) "
          + "where f.follower_id = :followerId and m.member_status = \"MEMBER_ACTIVE\" group by f.following_id",
      nativeQuery = true)
  Page<FollowMemberInterface> findAllFollowingsByFollowerId(@Param("followerId") Long followerId, Pageable pageable);


  @Query("select ing.memberId from Follow f join f.follower ed join f.following ing where ed.memberId = :memberId")
  List<Long> findAllFollowingId(@Param("memberId") long memberId);

  @Query(value = "select f.follow_id from follow as f where f.following_id = :targetId and f.follower_id = :memberId", nativeQuery = true)
  Optional<Long> findFollowIdByUsers(@Param("memberId") long memberId,
      @Param("targetId") long targetId);
}
