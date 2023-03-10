package com.mainproject.back.block.service;

import com.mainproject.back.block.entity.Block;
import com.mainproject.back.block.repository.BlockRepository;
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