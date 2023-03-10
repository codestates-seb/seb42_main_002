package com.mainproject.back.member.controller;

import com.mainproject.back.helper.UriCreator;
import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.dto.MemberDto.Patch;
import com.mainproject.back.member.dto.MemberTagDto;
import com.mainproject.back.member.dto.MemberTagPatchDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.entity.Member.MemberStatus;
import com.mainproject.back.member.mapper.MemberMapper;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.member.tag.MemberTag;
import java.net.URI;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {

  private final static String MEMBER_DEFAULT_URL = "/members";
  private final MemberService memberService;
  private final MemberMapper mapper;

  public MemberController(MemberService memberService, MemberMapper mapper) {
    this.memberService = memberService;
    this.mapper = mapper;
  }

  @PostMapping
  public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {

    requestBody.setMemberStatus(MemberStatus.MEMBER_ACTIVE);
    Member member = mapper.memberPostToMember(requestBody);

    Member createdMember = memberService.createMember(member);

    URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

    return ResponseEntity.created(location).build();

  }

  @PatchMapping("/{member-id}")
  public ResponseEntity patchMember(
      @PathVariable("member-id") @Positive long memberId,
      @Valid @RequestBody MemberDto.Patch requestBody) {
//    Patch.builder()
//        .memberId(memberId)
//        .build();

    requestBody.setMemberId(memberId);
    Member updateMember = memberService.updateMember(requestBody, mapper.memberPatchToMember(requestBody));

    return new ResponseEntity<>(mapper.memberToMemberResponse(updateMember), HttpStatus.OK);
  }
  @PatchMapping("/{member-id}/tag")
  public ResponseEntity patchMemberTag(
      @PathVariable("member-id") @Positive long memberId,
      @Valid @RequestBody MemberTagPatchDto requestBody) {

    Member updateMember = memberService.updateMemberTag(memberId, requestBody);

    return new ResponseEntity<>(mapper.memberToMemberResponse(updateMember), HttpStatus.OK);
  }

  @GetMapping("/{member-id}")
  public ResponseEntity getMember(
      @PathVariable("member-id") @Positive long memberId) {

    Member findMember = memberService.findMember(memberId);

    return new ResponseEntity<>(mapper.memberToMemberResponse(findMember), HttpStatus.OK);

  }

  @DeleteMapping("/{member-id}")
  public ResponseEntity deleteMember(
      @PathVariable("member-id") @Positive long memberId) {
    memberService.deleteMember(memberId);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
