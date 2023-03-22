package com.mainproject.back.block.service;

import com.mainproject.back.block.entity.Block;
import com.mainproject.back.block.exception.BlockExceptionCode;
import com.mainproject.back.block.repository.BlockRepository;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.follow.service.FollowService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BlockService {

  private final BlockRepository blockRepository;
  private final FollowService followService;

  @Transactional
  public Block createBlock(Block block) {
    blockRepository.findBlockByTargetIdAndMemberId(block.getTarget().getMemberId(),
        block.getMember().getMemberId()).ifPresent(b -> {throw new BusinessLogicException(BlockExceptionCode.BLOCK_EXISTS);});
    followService.deleteFollowByBlock(block.getMember().getMemberId(),
        block.getTarget().getMemberId());
    return blockRepository.save(block);
  }

  @Transactional
  public void deleteBlock(long targetId, long memberId) {
    Block findBlock = blockRepository.findBlockByTargetIdAndMemberId(targetId, memberId)
        .orElseThrow(() -> new BusinessLogicException(
            BlockExceptionCode.BLOCK_NOT_FOUND));
    blockRepository.delete(findBlock);
  }

  public Page<Block> findBlocks(long memberId, Pageable pageable) {
    return blockRepository.findAllByMemberId(memberId, pageable);
  }

  public List<Long> findBlockIdList(long memberId) {
    return blockRepository.findBlockIdsByMemberId(memberId);
  }
}