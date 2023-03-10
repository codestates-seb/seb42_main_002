package com.mainproject.back.member.repository;

import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.tag.MemberTag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {
  void deleteAllByMember(Member member);


}
