package com.mainproject.back.block.entity;

import com.mainproject.back.helper.UriCreator;
import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.entity.Member.MemberStatus;
import com.mainproject.back.member.service.MemberService;
import java.net.URI;
import javax.transaction.Transactional;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
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
import org.springframework.web.util.UriComponentsBuilder;

@CrossOrigin
@RestController
@RequestMapping("/blocks")
@Validated
@Slf4j
public class BlockController {

  // block
  // unblock
  // isblock
  // getblock

  private final BlockService blockService;
  private final BlockMapper mapper;
  private final MemberService memberService;

  @Autowired
  public BlockController(BlockMapper mapper, BlockService blockService,
      MemberService memberService) {
    this.blockService = blockService;
    this.mapper = mapper;
    this.memberService = memberService;
  }

  @PostMapping
  public ResponseEntity postBlock(@Valid @RequestBody BlockDto.Post requestBody) {

    Member member = memberService.findMember(requestBody.getMemberId());
    Member target = memberService.findMember(requestBody.getTargetId());

    Block block = new Block();
    block.setMember(member);
    block.setTarget(target);

    Block createdBlock = blockService.createBlock(block);

    return ResponseEntity.ok().build();
  }

  @GetMapping
  public ResponseEntity getBlocks(@PageableDefault(sort = "block_id") Pageable pageable) {
    long memberId = 1L; // 임의값
    Page<Block> blockPage = blockService.findBlocks(memberId, pageable);

    return ResponseEntity.ok().body(blockPage);

  }

  @DeleteMapping("/{block-id}")
  public ResponseEntity deleteBlock(@PathVariable("block-id")long blockId) {
    blockService.deleteBlock(blockId);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}