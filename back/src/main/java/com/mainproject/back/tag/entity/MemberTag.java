package com.mainproject.back.tag.entity;

import com.mainproject.back.audit.Auditable;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.tag.exception.TagExceptionCode;
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

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberTag extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long memberTagId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "tag_id")
  private Tag tag;

  public void addMember(Member member) {
    this.member = member;
    if (this.member.getMemberTags().contains(this)) {
      throw new BusinessLogicException(
          TagExceptionCode.TAG_EXISTS);
    } else {
      this.member.getMemberTags().add(this);
    }
  }

  public void addTag(Tag tag) {
    this.tag = tag;
    if (this.tag.getMemberTags().contains(this)) {
      throw new BusinessLogicException(TagExceptionCode.TAG_EXISTS);
    } else {
      this.tag.getMemberTags().add(this);
    }
  }
}
