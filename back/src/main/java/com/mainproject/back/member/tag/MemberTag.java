package com.mainproject.back.member.tag;

import com.mainproject.back.member.entity.Member;
import com.mainproject.back.tag.entity.Tag;
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
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberTag {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long memberTagId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "tag_id")
  private Tag tag;

  public void addMember(Member member) {
    this.member = member;
    if (!this.member.getMemberTags().contains(this)) {
      this.member.getMemberTags().add(this);
    }
  }

  public void addTag(Tag tag) {
    this.tag = tag;
    if (!this.tag.getMemberTags().contains(this)) {
      this.tag.getMemberTags().add(this);
    }
  }
}
