package com.mainproject.back.block.controller;

import com.mainproject.back.block.dto.BlockDto;
import com.mainproject.back.block.entity.Block;
import com.mainproject.back.block.mapper.BlockMapper;
import com.mainproject.back.block.service.BlockService;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberService;
import java.security.Principal;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/blocks")
@Validated
@RequiredArgsConstructor
@Slf4j
public class BlockController {

  // block
  // unblock
  // isblock
  // getblock

  private final BlockService blockService;
  private final MemberService memberService;
  private final BlockMapper mapper;

  @PostMapping
  public ResponseEntity postBlock(@Valid @RequestBody BlockDto.Post requestBody,
      Principal principal) {

    Member member = memberService.findMemberByEmail(principal.getName());
    Member target = memberService.findMember(requestBody.getTargetId());

    Block block = new Block();
    block.setMember(member);
    block.setTarget(target);

    Block createdBlock = blockService.createBlock(block);

    return ResponseEntity.ok().build();
  }

  @GetMapping
  public ResponseEntity getBlocks(@PageableDefault(sort = "block_id") Pageable pageable, Principal principal) {
    Member member = memberService.findMemberByEmail(principal.getName());
    Page<Block> blockPage = blockService.findBlocks(member.getMemberId(), pageable);
    Page<MemberLetterDto> responses = blockService.blockToMemberLetterDto(blockPage);
    return ResponseEntity.ok().body(responses);

  }

  @DeleteMapping("/{block-id}")
  public ResponseEntity deleteBlock(@PathVariable("block-id") long blockId) {
    blockService.deleteBlock(blockId);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}