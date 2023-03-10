package com.mainproject.back.block.entity;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BlockMapper {
  Block blockPostToBlock(BlockDto.Post requestBody);
//  Block blockPatchToBlock(BlockDto.Patch requestBody);
//  BlockDto.Response blockToBlockResponse(Block block);
//  List<BlockDto.Response> blocksToBlockResponses(List<Block> blocks);

}