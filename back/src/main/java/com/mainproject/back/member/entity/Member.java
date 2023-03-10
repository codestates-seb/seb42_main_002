package com.mainproject.back.member.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.mainproject.back.audit.Auditable;
import com.mainproject.back.follow.entity.Follow;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.language.MemberLanguage;
import com.mainproject.back.member.tag.MemberTag;
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

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Setter
public class Member extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long memberId;
  @Column(nullable = false)
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
  private String introduce;
  @Column
  private String location;
  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  private Gender gender = Gender.OTHER;
  @Column
  private String profile;

  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

  @OneToMany(mappedBy = "follower")
  private List<Follow> followers = new ArrayList<>();

  @OneToMany(mappedBy = "following")
  private List<Follow> followings = new ArrayList<>();

  @Setter
  @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
  private List<MemberTag> memberTags = new ArrayList<>();

  @OneToMany(mappedBy = "member")
  private List<MemberLanguage> memberLanguages = new ArrayList<>();
  @OneToMany(mappedBy = "member")
  @Default
  private List<Vocabulary> vocabularies = new ArrayList<>();

  @RequiredArgsConstructor
  public enum MemberStatus {
    MEMBER_ACTIVE("활동중"),
    MEMBER_SLEEP("휴면 상태"),
    MEMBER_QUIT("탈퇴 상태");

    @Getter
    private final String status;
  }

  @ElementCollection(fetch = FetchType.EAGER)
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
