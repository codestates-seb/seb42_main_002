package com.mainproject.back.language.entity;

import com.mainproject.back.member.language.MemberLanguage;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Language {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int languageId;

  @OneToMany
  @Column
  private String nation;

  @OneToMany(mappedBy = "language")
  private List<MemberLanguage> memberLanguages = new ArrayList<>();

}
