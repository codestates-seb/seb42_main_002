package com.mainproject.back.member.controller;

import com.mainproject.back.helper.UriCreator;
import com.mainproject.back.letter.dto.LetterListDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.dto.MemberRecommendDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.mapper.MemberMapper;
import com.mainproject.back.member.service.MemberConvertService;
import com.mainproject.back.member.service.MemberService;
import java.net.URI;
import java.security.Principal;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
@RequiredArgsConstructor
@Validated
@Slf4j
public class MemberController {

  private final static String MEMBER_DEFAULT_URL = "/members";
  private final MemberService memberService;
  private final MemberMapper mapper;
  private final MemberConvertService memberConvertService;


  @PostMapping
  public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {

    Member member = mapper.memberPostToMember(requestBody);

    Member createdMember = memberService.createMember(member);

    URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

    return ResponseEntity.created(location).build();
  }

  @PatchMapping
  public ResponseEntity patchMember(
      Principal principal,
      @Valid @RequestBody MemberDto.Patch requestBody) {
    Member currentMember = memberService.findMemberByEmail(principal.getName());
    requestBody.setMemberId(currentMember.getMemberId());
    Member member = memberConvertService.memberPatchDtoToMember(requestBody);
    log.info("## 사용자 정보 수정: {}", member.toString());
    Member updateMember = memberService.updateMember(member);
    return ResponseEntity.ok().body(mapper.memberToMemberResponse(updateMember));
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

  @GetMapping("/recommend")
  public ResponseEntity getRecommended(Principal principal) {
    Member currentMember = memberService.findMemberByEmail(principal.getName());

    Page<Member> memberPage = memberService.findRecommendedMember(
        currentMember.getMemberId(), PageRequest.of(0,10));
    Page<MemberRecommendDto> memberRecommendDtoPage = mapper.pageMemberToMemberRecommendDtoPage(
        memberPage);
    return ResponseEntity.ok().body(memberRecommendDtoPage);
  }

}
