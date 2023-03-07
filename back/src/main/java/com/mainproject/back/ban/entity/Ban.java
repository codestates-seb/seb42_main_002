package com.mainproject.back.ban.entity;

import com.mainproject.back.member.entity.Member;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Ban {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int banId;

  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member memberId;

  @ManyToOne
  @JoinColumn(name = "TARGET_ID")
  private Member targetId;

}
