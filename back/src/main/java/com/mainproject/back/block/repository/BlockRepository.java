package com.mainproject.back.block.repository;

import com.mainproject.back.block.entity.Block;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface BlockRepository extends JpaRepository<Block, Long> {

  @Query(value = "select * from block where member_id = :memberId", nativeQuery = true)
  public Page<Block> findAllByMemberId(long memberId, Pageable pageable);

  @Query("select b from Block b join b.target t where t.memberId = :targetId")
  Optional<Block> findBlockIdByTargetId(@Param("targetId") long targetId);

  @Query("select t.memberId from Block b join b.member m join b.target t where m.memberId = :memberId")
  List<Long> findBlockIdsByMemberId(@Param("memberId") long memberId);
}
