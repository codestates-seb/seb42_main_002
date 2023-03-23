package com.mainproject.back.follow.controller;


import com.mainproject.back.follow.dto.FollowDto;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.follow.mapper.FollowMapper;
import com.mainproject.back.follow.service.FollowService;
import com.mainproject.back.member.dto.MemberLetterDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.service.MemberConvertService;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.util.Check;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/users/me/follows")
@Validated
@RequiredArgsConstructor
@Slf4j
public class FollowController {

  private final FollowService followService;

  private final FollowMapper followMapper;
  private final MemberService memberService;
  private final MemberConvertService memberConvertService;

  @PostMapping
  public ResponseEntity postFollow(@Valid @RequestBody FollowDto.Post requestBody,
      Principal principal) {
    log.info("## 팔로우 요청");

    Member follower = memberService.findMemberByEmail(Check.checkPrincipal(principal));
    Member following = memberService.findMember(requestBody.getFollowingId());

    Follow follow = new Follow();
    follow.setFollower(follower);
    follow.setFollowing(following);

    Follow createdFollow = followService.createFollow(follow);
    URI uri = UriCreator.createUri("/follow", createdFollow.getFollowId());
    return ResponseEntity.created(uri).build();
  }

  @GetMapping("/follower")
  public ResponseEntity getFollower(@PageableDefault(sort = "follow_id") Pageable pageable,
      Principal principal) {
    log.info("## 팔로워 조회");
    Member currentMember = memberService.findMemberByEmail(Check.checkPrincipal(principal));

    Page<Follow> followPage = followService.findFollower(currentMember.getMemberId(), pageable);

    Page<FollowDto.Response> responses = followMapper.pageFollowToPageFollowResponsePage(
        followPage);

    return ResponseEntity.ok().body(responses);

  }

  @GetMapping
  public ResponseEntity getFollowing(@PageableDefault Pageable pageable,
      Principal principal) {
    log.info("## 팔로잉 조회");
    Member currentMember = memberService.findMemberByEmail(Check.checkPrincipal(principal));

    Page<Follow> followPage = followService.findFollowing(currentMember.getMemberId(), pageable);

    Page<MemberLetterDto> responses = memberConvertService.followPageToMemberLetterPage(followPage);

    return ResponseEntity.ok().body(responses);

  }

  @DeleteMapping(params = "target")
  public ResponseEntity deleteBlock(@RequestParam("target") @Positive long followingId,
      Principal principal) {
    log.info("## 팔로우 삭제");
    followService.deleteFollow(followingId, memberService.findMemberIdByEmail(Check.checkPrincipal(principal)));
    return ResponseEntity.noContent().build();
  }
}


