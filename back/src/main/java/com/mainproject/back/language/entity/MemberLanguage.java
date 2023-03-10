package com.mainproject.back.language.entity;


import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.language.exception.LanguageExceptionCode;
import com.mainproject.back.member.entity.Member;
import javax.persistence.Column;
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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberLanguage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long memberLanguageId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "language_id")
  private Language language;

  @Column
  private int level;

  public void addMember(Member member) {
    this.member = member;
    if (this.member.getMemberLanguages().contains(this)) {
      throw new BusinessLogicException(LanguageExceptionCode.LANGUAGE_EXISTS);
    } else {
      this.member.getMemberLanguages().add(this);
    }
  }

  public void addLanguage(Language language) {
    this.language = language;
    if (this.language.getMemberLanguages().contains(this)) {
      throw new BusinessLogicException(LanguageExceptionCode.LANGUAGE_EXISTS);
    } else {
      this.language.getMemberLanguages().add(this);
    }
  }
}
