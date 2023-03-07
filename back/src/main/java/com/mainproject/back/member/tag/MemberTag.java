package com.mainproject.back.member.tag;

import com.mainproject.back.member.entity.Member;
import com.mainproject.back.tag.entity.Tag;
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
public class MemberTag {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int memberTagId;

  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member memberId;

  @ManyToOne
  @JoinColumn(name = "TAG_ID")
  private Tag tagId;

}
