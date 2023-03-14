package com.mainproject.back.block.service;

import com.mainproject.back.block.entity.Block;
import com.mainproject.back.block.exception.BlockExceptionCode;
import com.mainproject.back.block.repository.BlockRepository;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.letter.dto.LetterSimpleDto;
import com.mainproject.back.letter.dto.LetterSimpleDto.LetterStatus;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.service.LetterService;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BlockService {

  private final BlockRepository blockRepository;
  private final MemberService memberService;
  private final LetterService letterService;

  public Block createBlock(Block block) {
    return blockRepository.save(block);
  }

  public void deleteBlock(long blockId) {
    long foundId = blockRepository.findBlockIdByBlockId(blockId)
        .orElseThrow(() -> new BusinessLogicException(
            BlockExceptionCode.BLOCK_NOT_FOUND));
    blockRepository.deleteById(foundId);
  }

  public Page<Block> findBlocks(long memberId, Pageable pageable) {
    return blockRepository.findAllByMemberId(memberId, pageable);
  }

  public Page<MemberLetterDto> blockToMemberLetterDto(Page<Block> blockPage) {
    return blockPage.map(block -> {
      Member member = memberService.findMember(block.getTarget().getMemberId());
      Letter letter = letterService.findLastLetter(block.getMember().getMemberId(),
          block.getTarget().getMemberId());
      MemberLetterDto.MemberLetterDtoBuilder builder = MemberLetterDto.builder()
          .name(member.getName())
          .profile(member.getProfile())
          .location(member.getLocation())
          .memberId(member.getMemberId());
      if (letter == null) {
        builder.lastLetter(null);
      } else {
        builder.lastLetter(LetterSimpleDto.builder().status(
                block.getMember().getMemberId() == letter.getReceiver().getMemberId()
                    ? LetterStatus.RECEIVED : LetterStatus.SENT).isRead(letter.getIsRead())
            .createdAt(letter.getCreatedAt()).build());
      }
      return builder.build();
    });
  }
}