package com.mainproject.back.vocabulary.repository;

import com.mainproject.back.vocabulary.entity.Vocabulary;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VocabRepository extends JpaRepository<Vocabulary, Long> {

  @Query("select v from Vocabulary v join v.member m where m.memberId = :memberId order by v.createdAt desc")
  Page<Vocabulary> findAllByMemberId(@Param("memberId") long memberId, Pageable pageable);

  @Query(value = "select * from vocabulary as q where q.member_id = :memberId order by rand() limit 1", nativeQuery = true)
  List<Vocabulary> findAllByMemberIdOrderByRand(@Param("memberId") long memberId);

}
