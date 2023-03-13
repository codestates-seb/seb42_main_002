package com.mainproject.back.language.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Language {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long languageId;

  @Column
  private String location;

  @OneToMany(mappedBy = "language")
  @Default
  private List<MemberLanguage> memberLanguages = new ArrayList<>();
}
