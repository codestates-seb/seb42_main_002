package com.mainproject.back.vocabulary.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "vocabulary")
@Entity
public class Vocabulary {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "vocab_id", nullable = false)
  private Long vocabId;

  @Column(nullable = false)
  private String word;
  @Column(nullable = false)
  private String meaning;

//  @ManyToOne
//  @JoinColumn(name = "member_id")
//  private Member member;
}
