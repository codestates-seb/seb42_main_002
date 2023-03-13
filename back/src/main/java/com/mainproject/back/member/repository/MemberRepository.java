package com.mainproject.back.member.repository;

import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.entity.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

  Optional<Member> findByEmail(String email);

  // 공통된 태그 많은 순으로 정렬
  @Query(value = "select m.* from member_tag a join member_tag b on a.tag_id = b.tag_id "
      + "join member m on b.member_id = m.member_id "
      + "where a.member_id = :memberId and b.member_id != :memberId "
      + "group by b.member_id order by count(*) desc", nativeQuery = true)
  Page<Member> findRecommended(@Param("memberId") long memberId, Pageable pageable);


}
