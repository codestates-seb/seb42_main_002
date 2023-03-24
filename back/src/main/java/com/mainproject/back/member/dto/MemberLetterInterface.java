package com.mainproject.back.member.dto;

import com.mainproject.back.member.entity.Member;
import java.time.LocalDateTime;

public interface MemberLetterInterface {
  Long getMember_id();
  String getName();
  String getLocation();
  String getProfile();
  String getBirthday();
  Member.MemberStatus getMember_status();
  LocalDateTime getCreated_at();
  Boolean getIs_read();
  Long getFollower_id();
  Long getReceiver_id();
}
