package com.mainproject.back.letter.repository;

import com.mainproject.back.letter.entity.Letter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LetterRepository extends JpaRepository<Letter, Long> {

  @Query("select l from Letter l join l.sender s join l.receiver r where s.memberId = :memberId and r.memberId = :targetId")
  Page<Letter> findLettersByMember(@Param("memberId") long memberId, @Param("targetId") long targetId, Pageable pageable);

  // 읽지 않은 받은 편지 개수
  @Query("select COUNT(l) from Letter l join l.receiver r where l.isRead = false and r.memberId = :memberId")
  Long countByIsReadAndReceiver(@Param("memberId") long memberId);
}
