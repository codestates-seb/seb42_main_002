package com.mainproject.back.member.repository;

import com.mainproject.back.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

  @Query(value = "select * from member m where m.email = :email and m.member_status = \"MEMBER_ACTIVE\"", nativeQuery = true)
  Optional<Member> findByEmail(String email);

  @Query(value = "select m.member_id from member m where m.email = :email and m.member_status = \"MEMBER_ACTIVE\"", nativeQuery = true)
  Optional<Long> findMemberIdByEmail(@Param("email") String email);

  // 공통된 태그 많은 순으로 정렬
//  @Query(value = "select m.* from member_tag a join member_tag b on a.tag_id = b.tag_id "
//      + "join member m on b.member_id = m.member_id "
//      + "where a.member_id = :memberId and b.member_id != :memberId and member_status = \"MEMBER_ACTIVE\" "
//      + "group by b.member_id order by count(*) desc", nativeQuery = true)
  @Query(value = "select m.* from member m "
      + "join member_tag t on t.tag_id in"
      + "(select mt.tag_id from member_tag mt where mt.member_id = :memberId) "
      + "where m.member_id != :memberId and t.member_id = m.member_id and m.member_status = \"MEMBER_ACTIVE\" "
      + "group by m.member_id order by count(t.member_tag_id) desc", nativeQuery = true)
  List<Member> findRecommended(@Param("memberId") long memberId);

  @Query(value = "select m.* from member m "
      + "join member_tag mt on mt.tag_id in(:tags) "
      + "where m.member_id != :memberId and m.member_id = mt.member_id and member_status = \"MEMBER_ACTIVE\" "
      + "group by m.member_id order by count(mt.member_tag_id) desc", nativeQuery = true)
  List<Member> getMemberByTags(@Param("tags") List<Long> tags, @Param("memberId") long memberId);


  @Query(value = "select m.* from member m "
      + "join member_language ml on ml.language_id in(:languages) "
      + "join member_tag mt on mt.tag_id in(:tags) "
      + "where m.member_id != :memberId and (m.member_id = ml.member_id or m.member_id = mt.member_id) and member_status = \"MEMBER_ACTIVE\" "
      + "group by m.member_id order by count(ml.member_language_id + mt.member_tag_id) desc", nativeQuery = true)
  List<Member> getMemberByTagsAndLang(@Param("tags") List<Long> tags,
      @Param("languages") List<Long> languages, @Param("memberId") long memberId);

  @Query(value =
      "select m.* from member m "
          + "join member_language ml on ml.language_id in(:languages) "
          + "where m.member_id != :memberId and m.member_id = ml.member_id and member_status = \"MEMBER_ACTIVE\" "
          + "group by m.member_id order by count(ml.member_language_id) desc", nativeQuery = true)
  List<Member> getMemberByLang(@Param("languages") List<Long> languages, @Param("memberId") long memberId);
}
