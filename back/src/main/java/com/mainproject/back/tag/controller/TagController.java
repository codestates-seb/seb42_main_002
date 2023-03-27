package com.mainproject.back.tag.controller;

import com.mainproject.back.tag.dto.TagSimpleDto;
import com.mainproject.back.tag.mapper.TagMapper;
import com.mainproject.back.tag.service.TagService;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
@Slf4j
public class TagController {

  private final TagService tagService;
  private final TagMapper tagMapper;

  @ApiOperation(value = "모든 태그 조회")
  @GetMapping
  public ResponseEntity getAllTags() {
    log.info("## 모든 태그 조회");
    List<TagSimpleDto> tagList = tagService.findAllTags().stream().map(tagMapper::tagToTagSimpleDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok().body(tagList);
  }
}
