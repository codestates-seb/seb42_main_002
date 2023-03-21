package com.mainproject.back.block.controller;

import com.mainproject.back.block.dto.BlockDto;
import com.mainproject.back.block.entity.Block;
import com.mainproject.back.block.service.BlockService;
import com.mainproject.back.member.dto.MemberBlockDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberConvertService;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.util.UriCreator;
import java.net.URI;
import java.security.Principal;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
  private final MemberConvertService memberConvertService;

  @PostMapping
  public ResponseEntity postBlock(@Valid @RequestBody BlockDto.Post requestBody,
      Principal principal) {
    log.info("## 차단 생성: {}", requestBody.getTargetId());
    Member member = memberService.findMemberByEmail(principal.getName());
    Member target = memberService.findMember(requestBody.getTargetId());

    Block block = new Block();
    block.setMember(member);
    block.setTarget(target);

    Block createdBlock = blockService.createBlock(block);
    URI uri = UriCreator.createUri("/blocks", createdBlock.getBlockId());
    return ResponseEntity.created(uri).build();
  }

  @GetMapping
  public ResponseEntity getBlocks(@PageableDefault(sort = "block_id") Pageable pageable,
      Principal principal) {
    log.info("## 차단 목록 조회: {}", principal.getName());
    Member member = memberService.findMemberByEmail(principal.getName());
    Page<Block> blockPage = blockService.findBlocks(member.getMemberId(), pageable);
    Page<MemberBlockDto> responses = memberConvertService.blockPageToMemberBlockPage(blockPage);
    return ResponseEntity.ok().body(responses);

  }

  @DeleteMapping("/{target-id}")
  public ResponseEntity deleteBlock(@PathVariable("target-id") @Positive long targetId) {
    log.info("## 차단 목록 삭제: {}", targetId);
    blockService.deleteBlock(targetId);
    return ResponseEntity.noContent().build();
  }
}