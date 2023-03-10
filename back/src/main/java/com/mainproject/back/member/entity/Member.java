package com.mainproject.back.member.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.mainproject.back.audit.Auditable;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.language.entity.MemberLanguage;
import com.mainproject.back.tag.entity.MemberTag;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
public class Member extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long memberId;
  @Column(nullable = false)
  @Setter
  private String name;
  @Column(nullable = false, updatable = false)
  private String email;
  @JsonProperty(access = Access.WRITE_ONLY)
  @Column(nullable = false, length = 30)
  private String password;
  @Column(nullable = false)
  private String birthday;
  @Column
  @Lob
  @Setter
  private String introduce;
  @Column
  @Setter
  private String location;
  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  @Setter
  private Gender gender;
  @Column
  @Setter
  private String profile;

  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  @Default
  private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

  @OneToMany(mappedBy = "follower")
  @Default
  @Exclude
  private List<Follow> followers = new ArrayList<>();

  @OneToMany(mappedBy = "following")
  @Default
  @Exclude
  private List<Follow> followings = new ArrayList<>();

  @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
  @Default
  @Exclude
  private List<MemberTag> memberTags = new ArrayList<>();

  public void setMemberTags(List<MemberTag> memberTagList) {
    this.memberTags.clear();
    this.memberTags.addAll(memberTagList);
  }

  @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
  @Default
  @Exclude
  private List<MemberLanguage> memberLanguages = new ArrayList<>();

  public void setMemberLanguages(List<MemberLanguage> memberLanguageList) {
    this.memberLanguages.clear();
    this.memberLanguages.addAll(memberLanguageList);
  }

  @OneToMany(mappedBy = "member")
  @Default
  @Exclude
  private List<Vocabulary> vocabularies = new ArrayList<>();

  @RequiredArgsConstructor
  public enum MemberStatus {
    MEMBER_ACTIVE("활동중"),
    MEMBER_SLEEP("휴면 상태"),
    MEMBER_QUIT("탈퇴 상태");

    @Getter
    private final String status;
  }

  @ElementCollection(fetch = FetchType.LAZY)
  @Default
  private List<String> roles = new ArrayList<>();

  @RequiredArgsConstructor
  public enum Gender {
    MALE("남"),
    FEMALE("여"),

    OTHER("기타");
    @Getter
    private final String choseGender;
  }
}


