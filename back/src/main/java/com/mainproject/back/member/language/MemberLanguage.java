package com.mainproject.back.member.language;


import com.mainproject.back.language.entity.Language;
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
public class MemberLanguage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int memberLanguageId;

  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member member;

  @ManyToOne
  @JoinColumn(name = "LANGUAGE_ID")
  private Language language;

}
