package com.mainproject.back.block.entity;

import com.mainproject.back.member.entity.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


public interface BlockRepository extends JpaRepository<Block , Long> {

  @Query(value = "select * from block where member_id = :memberId", nativeQuery = true)
  public Page<Block> findAllByMemberId(long memberId, Pageable pageable);


}
