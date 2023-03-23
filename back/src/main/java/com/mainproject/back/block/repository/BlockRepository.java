package com.mainproject.back.block.repository;

import com.mainproject.back.block.entity.Block;
import com.mainproject.back.member.dto.MemberBlockInterface;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface BlockRepository extends JpaRepository<Block, Long> {

  @Query(value = "select m.member_id, m.name, m.profile, m.location from block b "
      + "join member m on m.member_id = b.target_id where b.member_id = :memberId", nativeQuery = true)
  Page<MemberBlockInterface> findAllByMemberId(long memberId, Pageable pageable);

  @Query("select b from Block b join b.target t join b.member m where t.memberId = :targetId and m.memberId = :memberId")
  Optional<Block> findBlockByTargetIdAndMemberId(@Param("targetId") long targetId, @Param("memberId") long memberId);

  @Query("select t.memberId from Block b join b.member m join b.target t where m.memberId = :memberId")
  List<Long> findBlockIdsByMemberId(@Param("memberId") long memberId);
}
