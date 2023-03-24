package com.mainproject.back.member.controller;

import com.mainproject.back.helper.UriCreator;
import com.mainproject.back.language.entity.Language;
import com.mainproject.back.member.dto.MemberDto;
import com.mainproject.back.member.dto.MemberRecommendDto;
import com.mainproject.back.member.dto.MemberSearchDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.mapper.MemberMapper;
import com.mainproject.back.member.service.MemberConvertService;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.tag.entity.Tag;
import com.mainproject.back.util.Check;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
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
    log.info("## 회원 가입");
    Member member = mapper.memberPostToMember(requestBody);

    Member createdMember = memberService.createMember(member);

    URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

    return ResponseEntity.created(location).build();
  }

  @PatchMapping("/me")
  public ResponseEntity patchMember(
      Principal principal,
      @Valid @RequestBody MemberDto.Patch requestBody) {
    Long currentId = memberService.findMemberIdByEmail(Check.checkPrincipal(principal));
    requestBody.setMemberId(currentId);
    Member member = memberConvertService.memberPatchDtoToMember(requestBody);
    log.info("## 사용자 정보 수정: {}", member.toString());
    Member updateMember = memberService.updateMember(member);
    return ResponseEntity.ok().body(mapper.memberToMemberResponse(updateMember));
  }

  @GetMapping("/me")
  public ResponseEntity getMemberBySelf(Principal principal) {
    log.info("## 내 정보 조회");
    Member findMember = memberService.findMemberByEmail(Check.checkPrincipal(principal));

    return ResponseEntity.ok().body(mapper.memberToMemberResponse(findMember));
  }

  @GetMapping("/{member-id}")
  public ResponseEntity getMember(
      @PathVariable("member-id") @Positive long memberId, Principal principal) {
    Member findMember = memberService.findMember(memberId);
    log.info("## 사용자 정보 조회: {}", findMember.toString());
    long id = memberService.findMemberIdByEmail(Check.checkPrincipal(principal));

    return new ResponseEntity<>(memberConvertService.memberToResponseDto(findMember, id),
        HttpStatus.OK);

  }

  @DeleteMapping("/me")
  public ResponseEntity deleteMember(Principal principal) {
    log.info("## 사용자 탈퇴: {}", principal.getName());
    Member currentMember = memberService.findMemberByEmail(Check.checkPrincipal(principal));
    memberService.deleteMember(currentMember.getMemberId());

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/me/recommend")
  public ResponseEntity getRecommended(Principal principal) {
    log.info("## 사용자 태그 기반 추천 친구");
    Member currentMember = memberService.findMemberByEmail(Check.checkPrincipal(principal));

    Page<Member> memberPage = memberService.findRecommendedMember(
        currentMember.getMemberId(), PageRequest.of(0, 10));
    Page<MemberRecommendDto> memberRecommendDtoPage = mapper.pageMemberToMemberRecommendDtoPage(
        memberPage);
    return ResponseEntity.ok().body(memberRecommendDtoPage);
  }

  @GetMapping("/search")
  public ResponseEntity searchMembers(
      @RequestParam(value = "tag", required = false, defaultValue = "") String tags,
      @RequestParam(value = "lang", required = false, defaultValue = "") String lang,
      @PageableDefault Pageable pageable, Principal principal) {
    long memberId = memberService.findMemberIdByEmail(Check.checkPrincipal(principal));
    log.info("## 태그 검색: {}", tags);
    log.info("## 언어 검색: {}", lang);

    List<Tag> tagList = memberConvertService.getTags(
        URLDecoder.decode(tags, StandardCharsets.UTF_8));
    List<Language> languageList = memberConvertService.getLanguages(
        URLDecoder.decode(lang, StandardCharsets.UTF_8));
    log.info("## 태그+언어로 사용자 검색: tags={}\n\t lang={}", tagList.toString(), languageList.toString());
    Page<Member> memberPage = memberService
        .searchMembersByTag(tagList, languageList, pageable, memberId);
    Page<MemberSearchDto> searchDtoPage = memberConvertService
        .memberPageToMemberSearchDtoPage(memberPage, memberId);
    return ResponseEntity.ok().body(searchDtoPage);
  }

}
