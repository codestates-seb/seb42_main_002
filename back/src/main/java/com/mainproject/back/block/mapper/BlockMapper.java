package com.mainproject.back.block.mapper;

import com.mainproject.back.block.dto.BlockDto;
import com.mainproject.back.block.entity.Block;
import com.mainproject.back.member.dto.MemberSimpleDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BlockMapper {

  default Page<BlockDto.Response> pageBlockToPageBlockResponsePage(Page<Block> blockPage) {
    return blockPage.map(this::blockToBlockResponse);
  }

  default BlockDto.Response blockToBlockResponse(Block block) {
    BlockDto.Response response =BlockDto.Response
        .builder()
        .member(MemberSimpleDto.builder().memberId(block.getMember().getMemberId())
            .name(block.getMember().getName()).build())
        .target(MemberSimpleDto.builder().memberId(block.getTarget().getMemberId())
            .name(block.getTarget().getName()).build())
        .build();
    return response;
  }
}
