package com.mainproject.back.follow.entity;

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
@Getter
@Setter
@NoArgsConstructor
public class Follow {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int followId;

  @ManyToOne
  @JoinColumn(name = "FOLLOWER_ID")
  private Member follower;

  @ManyToOne
  @JoinColumn(name = "FOLLOWING_ID")
  private Member following;

}
