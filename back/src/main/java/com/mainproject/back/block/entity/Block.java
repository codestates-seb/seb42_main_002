package com.mainproject.back.block.entity;

import com.mainproject.back.audit.Auditable;
import com.mainproject.back.member.entity.Member;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter

public class Block extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long blockId;

  @ManyToOne
  @Setter
  @JoinColumn(name = "member_id")
  private Member member;

  @ManyToOne
  @Setter
  @JoinColumn(name = "target_id")
  private Member target;


}

