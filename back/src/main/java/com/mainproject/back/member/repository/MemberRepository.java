package com.mainproject.back.member.repository;

import com.mainproject.back.member.entity.Member;
import java.util.List;
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

  @Query("select m.memberId from Member m where m.email = :email")
  Optional<Long> findMemberIdByEmail(@Param("email") String email);

  // 공통된 태그 많은 순으로 정렬
  @Query(value = "select m.* from member_tag a join member_tag b on a.tag_id = b.tag_id "
      + "join member m on b.member_id = m.member_id "
      + "where a.member_id = :memberId and b.member_id != :memberId "
      + "group by b.member_id order by count(*) desc", nativeQuery = true)
  Page<Member> findRecommended(@Param("memberId") long memberId, Pageable pageable);

  @Query(value = "select m.* from member_tag t "
      + "join member m on t.member_id = m.member_id "
      + "where t.member_id != :memberId and t.tag_id in (:tags)"
      + "group by t.member_id order by count(*) desc", nativeQuery = true)
  Page<Member> getMemberByTags(@Param("tags") List<Long> tags, long memberId, Pageable pageable);

  @Query(value = "select m.* from member m "
      + "join member_language ml on ml.language_id in(:languages) "
      + "join member_tag mt on mt.tag_id in(:tags) "
      + "where m.member_id != :memberId group by m.member_id order by count(ml.member_language_id + mt.member_tag_id) desc", nativeQuery = true)
  Page<Member> getMemberByTagsAndLang(@Param("tags") List<Long> tags,
      @Param("languages") List<Long> languages, long memberId, Pageable pageable);

  @Query(value =
      "select m.* from member_language a join member_language b on a.language_id in (:languages) "
          + "join member m on b.member_id = m.member_id "
          + "where a.member_id != :memberId "
          + "group by b.member_id order by count(*) desc", nativeQuery = true)
  Page<Member> getMemberByLang(@Param("languages") List<Long> languages, long memberId,
      Pageable pageable);
}
