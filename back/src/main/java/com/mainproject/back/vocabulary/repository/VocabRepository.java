package com.mainproject.back.vocabulary.repository;

import com.mainproject.back.vocabulary.entity.Vocabulary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VocabRepository extends JpaRepository<Vocabulary, Long> {
  @Query(value = "select * from vocabulary where member_id = :memberId", nativeQuery = true)
  public Page<Vocabulary> findAllByMemberId(long memberId, Pageable pageable);

}
