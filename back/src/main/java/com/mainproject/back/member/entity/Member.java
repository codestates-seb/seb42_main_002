package com.mainproject.back.member.entity;

import com.mainproject.back.follow.entity.Follow;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int memberId;
  @Column(nullable = false)
  private String name;

  @Column
  private String introduce;

  @Column(nullable = false, unique = true, updatable = false)
  private String email;

  @Column(nullable = false, length = 30)
  private String password;

  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

  @OneToMany(mappedBy = "member")
  private List<Follow> follows = new ArrayList<>();


  public enum MemberStatus {
    MEMBER_ACTIVE("활동중"),
    MEMBER_SLEEP("휴면 상태"),
    MEMBER_QUIT("탈퇴 상태");

    @Getter
    private String status;

    MemberStatus(String status) {
      this.status = status;
    }
  }

  public enum MemberRole {
    ROLE_USER,
    ROLE_ADMIN
  }

}
