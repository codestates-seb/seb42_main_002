package com.mainproject.back.member.entity;

import com.mainproject.back.audit.Auditable;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.member.language.MemberLanguage;
import com.mainproject.back.member.tag.MemberTag;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long memberId;
  @Column(nullable = false)
  private String name;

  @Column
  private String introduce;

  @Column(nullable = false, updatable = false)
  private String email;

  @Column(nullable = false, length = 30)
  private String password;

  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

  @OneToMany(mappedBy = "follower")
  private List<Follow> followers = new ArrayList<>();

  @OneToMany(mappedBy = "following")
  private List<Follow> followings = new ArrayList<>();

  @OneToMany(mappedBy = "member")
  private List<MemberTag> memberTags = new ArrayList<>();

  @OneToMany(mappedBy = "member")
  private List<MemberLanguage> memberLanguages = new ArrayList<>();

  @RequiredArgsConstructor
  public enum MemberStatus {
    MEMBER_ACTIVE("활동중"),
    MEMBER_SLEEP("휴면 상태"),
    MEMBER_QUIT("탈퇴 상태");

    @Getter
    private final String status;
  }

  public enum MemberRole {
    ROLE_USER,
    ROLE_ADMIN
  }

}
