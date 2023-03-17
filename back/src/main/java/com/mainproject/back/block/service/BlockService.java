package com.mainproject.back.block.service;

import com.mainproject.back.block.entity.Block;
import com.mainproject.back.block.exception.BlockExceptionCode;
import com.mainproject.back.block.repository.BlockRepository;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.follow.service.FollowService;
import com.mainproject.back.letter.dto.LetterSimpleDto;
import com.mainproject.back.letter.dto.LetterSimpleDto.LetterStatus;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.service.LetterService;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
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
    followService.deleteFollowByBlock(block.getMember().getMemberId(), block.getTarget().getMemberId());
    return blockRepository.save(block);
  }

  @Transactional
  public void deleteBlock(long blockId) {
    long foundId = blockRepository.findBlockIdByBlockId(blockId)
        .orElseThrow(() -> new BusinessLogicException(
            BlockExceptionCode.BLOCK_NOT_FOUND));
    blockRepository.deleteById(foundId);
  }

  public Page<Block> findBlocks(long memberId, Pageable pageable) {
    return blockRepository.findAllByMemberId(memberId, pageable);
  }

  public List<Long> findBlockIdList(long memberId) {
    return blockRepository.findBlockIdsByMemberId(memberId);
  }
}