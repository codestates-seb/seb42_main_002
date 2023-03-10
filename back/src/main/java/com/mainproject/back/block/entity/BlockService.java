package com.mainproject.back.block.entity;

import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BlockService {

  private final BlockRepository blockRepository;


  public Block createBlock(Block block) {
    return blockRepository.save(block);
  }

  public void deleteBlock(long blockId) { blockRepository.deleteById(blockId);}

  public Page<Block> findBlocks(long memberId, Pageable pageable) { return blockRepository.findAllByMemberId(memberId, pageable); }
}