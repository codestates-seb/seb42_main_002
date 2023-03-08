package com.mainproject.back.letter.repository;

import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.entity.Member;
import java.util.ArrayList;
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
      + "or (s.memberId = :targetId and r.memberId = :memberId)")
  Page<Letter> findLettersByMemberAndTarget(@Param("memberId") long memberId,
      @Param("targetId") long targetId, Pageable pageable);

  // 읽지 않은 받은 편지 개수
  @Query("select COUNT(l) from Letter l join l.receiver r where l.isRead = false and r.memberId = :memberId")
  Long countByIsReadAndReceiver(@Param("memberId") long memberId);

  // 특정 멤버가 보낸 편지 리스트
  @Query("select l from Letter l join l.sender s where s.memberId = :memberId")
  ArrayList<Letter> findSentLettersByMember(@Param("memberId") long memberId);

  // 특정 멤버가 받은 편지 리스트
  @Query("select l from Letter l join l.receiver r where r.memberId = :memberId")
  ArrayList<Letter> findReceivedLettersByMember(@Param("memberId") long memberId);

  // 특정 멤버가 받은 편지의 송신자 멤버 리스트
  @Query("select s from Letter l join l.sender s join l.receiver r where r.memberId = :memberId")
  ArrayList<Member> findSentMemberByLetter(@Param("memberId") long memberId);

  // 특정 멤버가 보낸 편지의 수신자 멤버 리스트
  @Query("select r from Letter l join l.sender s join l.receiver r where s.memberId = :memberId")
  ArrayList<Member> findReceivedMemberByLetter(@Param("memberId") long memberId);
}
