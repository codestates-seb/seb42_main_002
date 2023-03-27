package com.mainproject.back.letter.repository;

import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.dto.MemberLetterInterface;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LetterRepository extends JpaRepository<Letter, Long> {

  // 특정 멤버와 주고 받은 편지 리스트
  @Query(value = "select * from letter as l "
      + "where (l.sender_id = :memberId and l.receiver_id = :targetId) "
      + "or (l.sender_id = :targetId and l.receiver_id = :memberId) "
      + "order by l.created_at desc", nativeQuery = true)
  Page<Letter> findLettersByMemberAndTarget(@Param("memberId") long memberId,
      @Param("targetId") long targetId, Pageable pageable);

  // 읽지 않은 받은 편지 개수
  @Query(value = "select count(l.letter_id) from letter l join member m on m.member_id = l.sender_id "
      + "where l.receiver_id = :memberId and l.is_read = false and m.member_status = \"MEMBER_ACTIVE\"", nativeQuery = true)
  Long countByIsReadAndReceiver(@Param("memberId") long memberId);

  @Query(value = "select count(l.letter_id) from letter l join member m on m.member_id = l.sender_id "
      + "where l.receiver_id = :memberId and l.is_read = false "
      + "and m.member_status = \"MEMBER_ACTIVE\" and m.member_id not in (:blockIdList)", nativeQuery = true)
  Long countByIsReadAndReceiverAndBlock(@Param("memberId") long memberId, @Param("blockIdList")List<Long> blockIdList);

  // 편지를 주고 받은 회원 조회
  @Query(value = "select b.member_id, b.name, b.location, b.profile, b.birthday, b.member_status, "
      + "l.created_at, (select q.is_read from letter q where q.letter_id = l.letter_id) as is_read, l.receiver_id "
      + "from member a "
      + "join letter l on l.receiver_id = a.member_id or l.sender_id = a.member_id "
      + "join member b on (b.member_id = l.receiver_id or l.sender_id = b.member_id) and b.member_id != a.member_id "
      + "where a.member_id = :memberId and b.member_status = \"MEMBER_ACTIVE\" "
      + "group by b.member_id order by l.created_at desc ", nativeQuery = true)
  Page<MemberLetterInterface> findAllMemberLetterByMemberId(@Param("memberId") Long memberId, Pageable pageable);
}
