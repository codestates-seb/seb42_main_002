package com.mainproject.back.block.service;

import com.mainproject.back.block.entity.Block;
import com.mainproject.back.block.exception.BlockExceptionCode;
import com.mainproject.back.block.repository.BlockRepository;
import com.mainproject.back.exception.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BlockService {

  private final BlockRepository blockRepository;


  public Block createBlock(Block block) {
    return blockRepository.save(block);
  }

  public void deleteBlock(long blockId) {
    long foundId = blockRepository.findBlockIdByBlockId(blockId).orElseThrow(() -> new BusinessLogicException(
        BlockExceptionCode.BLOCK_NOT_FOUND));
    blockRepository.deleteById(foundId);
  }

  public Page<Block> findBlocks(long memberId, Pageable pageable) { return blockRepository.findAllByMemberId(memberId, pageable); }
}