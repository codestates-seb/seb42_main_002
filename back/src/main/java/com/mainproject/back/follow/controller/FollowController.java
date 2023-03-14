package com.mainproject.back.follow.controller;



import com.mainproject.back.block.dto.BlockDto;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.follow.dto.FollowDto;
import com.mainproject.back.follow.mapper.FollowMapper;
import com.mainproject.back.follow.service.FollowService;
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
@RequestMapping("/follow")
@Validated
@RequiredArgsConstructor
@Slf4j
public class FollowController {

  private final FollowService followService;

  private final FollowMapper followMapper;
  private final MemberService memberService;
  @PostMapping
  public ResponseEntity postFollow(@Valid @RequestBody FollowDto.Post requestBody,
      Principal principal) {

    Member follower = memberService.findMemberByEmail(principal.getName());
    Member following = memberService.findMember(requestBody.getFollowingId());

    Follow follow = new Follow();
    follow.setFollower(follower);
    follow.setFollowing(following);


    followService.createFollow(follow);

    return ResponseEntity.ok().build();
  }

  @GetMapping("/follower")
  public ResponseEntity getFollower(@PageableDefault(sort = "follow_id") Pageable pageable, Principal principal) {
    Member currentMember = memberService.findMemberByEmail(principal.getName());

    Page<Follow> followPage = followService.findFollower(currentMember.getMemberId(), pageable);

    Page<FollowDto.Response> responses = followMapper.pageFollowToPageFollowResponsePage(
        followPage);

    return ResponseEntity.ok().body(responses);

  }

  @GetMapping("/following")
  public ResponseEntity getFollowing(@PageableDefault(sort = "follow_id") Pageable pageable, Principal principal) {
    Member currentMember = memberService.findMemberByEmail(principal.getName());

    Page<Follow> followPage = followService.findFollowing(currentMember.getMemberId(), pageable);

    Page<FollowDto.Response> responses = followMapper.pageFollowToPageFollowResponsePage(
        followPage);


    return ResponseEntity.ok().body(responses);

  }

  @DeleteMapping("/{follow-id}")
  public ResponseEntity deleteBlock(@PathVariable("follow-id") long followId) {
    followService.deleteFollow(followId);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}


