package com.mainproject.back.member.repository;

import com.mainproject.back.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member , Long> {

  Optional<Member> findByEmail(String email);


}
