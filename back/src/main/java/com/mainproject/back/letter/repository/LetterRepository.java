package com.mainproject.back.letter.repository;

import com.mainproject.back.letter.entity.Letter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LetterRepository extends JpaRepository<Letter, Long> {

  @Query("select l from Letter l join l.member m join l.receiver r where m.memberId = :memberId or r.memberId = :receiverId")
  Page<Letter> findLettersByMemberOrReceiver(@Param("memberId") long memberId, @Param("receiverId") long receiverId, Pageable pageable);

}
