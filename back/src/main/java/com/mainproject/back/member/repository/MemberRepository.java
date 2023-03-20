package com.mainproject.back.member.repository;

import com.mainproject.back.language.entity.Language;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.tag.entity.Tag;
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

  @Query("select m from Member m join m.memberTags t join m.memberLanguages l where t.tag in(:tags)")
  Page<Member> getMemberByTags(@Param("tags")List<Tag> tags, Pageable pageable);

  @Query("select m from Member m join m.memberTags t join m.memberLanguages l where t.tag in(:tags) and l.language in(:languages)")
  Page<Member> getMemberByTagsAndLang(@Param("tags")List<Tag> tags, @Param("languages") List<Language> languages,Pageable pageable);

  @Query("select m from Member m join m.memberTags t join m.memberLanguages l where l.language in(:languages)")
  Page<Member> getMemberByLang(@Param("languages") List<Language> languages,Pageable pageable);
}
