package com.mainproject.back.follow.entity;

import com.mainproject.back.audit.Auditable;
import com.mainproject.back.member.entity.Member;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long followId;

  @ManyToOne(fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "follower_id")
  private Member follower;

  @ManyToOne(fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "following_id")
  private Member following;

}

