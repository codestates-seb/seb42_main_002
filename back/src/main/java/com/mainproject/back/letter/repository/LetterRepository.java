package com.mainproject.back.letter.repository;

import com.mainproject.back.letter.entity.Letter;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LetterRepository extends JpaRepository<Letter, Long> {

  // 특정 멤버와 주고 받은 편지 리스트
  @Query("select l from Letter l "
      + "join l.sender s join l.receiver r "
      + "where (s.memberId = :memberId and r.memberId = :targetId) "
      + "or (s.memberId = :targetId and r.memberId = :memberId) "
      + "order by l.createdAt desc")
  Page<Letter> findLettersByMemberAndTarget(@Param("memberId") long memberId,
      @Param("targetId") long targetId, Pageable pageable);

  // 읽지 않은 받은 편지 개수
  @Query("select count(l.letterId) from Letter l join l.receiver r join l.sender s "
      + "where l.isRead = false "
      + "and r.memberId = :memberId ")
  Long countByIsReadAndReceiver(@Param("memberId") long memberId);

  @Query("select count(l.letterId) from Letter l join l.receiver r join l.sender s "
      + "where l.isRead = false "
      + "and r.memberId = :memberId "
      + "and s.memberId not in (:blockIdList)")
  Long countByIsReadAndReceiverAndBlock(@Param("memberId") long memberId, @Param("blockIdList")List<Long> blockIdList);

  // 특정 멤버가 보낸 편지 리스트
  @Query("select l from Letter l join l.sender s where s.memberId = :memberId order by l.createdAt desc ")
  Set<Letter> findSentLettersByMember(@Param("memberId") long memberId);

  // 특정 멤버가 받은 편지 리스트
  @Query("select l from Letter l join l.receiver r where r.memberId = :memberId")
  Set<Letter> findReceivedLettersByMember(@Param("memberId") long memberId);

  @Query("select l from Letter l "
      + "join l.receiver r join l.sender s "
      + "where (r.memberId = :targetId and s.memberId = :memberId) or (r.memberId = :memberId and s.memberId = :targetId)"
      + "order by l.createdAt")
  Page<Letter> findLastLetterByMember(@Param("targetId") long targetId, @Param("memberId") long memberId, Pageable pageable);
}
