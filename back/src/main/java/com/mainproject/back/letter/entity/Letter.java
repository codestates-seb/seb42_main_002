package com.mainproject.back.letter.entity;

import com.mainproject.back.audit.Auditable;
import com.mainproject.back.member.entity.Member;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Letter extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long letterId;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  @Lob
  private String body;

  @Column
  @Setter
  @Default
  private Boolean isRead = false;

  @Column
  @ElementCollection(fetch = FetchType.LAZY)
  private List<String> pic;

  @Column(nullable = false)
  private LocalDateTime availableAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sender_id")
  private Member sender;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "receiver_id")
  private Member receiver;
}
