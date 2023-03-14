package com.mainproject.back.letter.entity;

import com.mainproject.back.audit.Auditable;
import com.mainproject.back.member.entity.Member;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
  @Lob
  private String body;

  @Column
  @Setter
  @Default
  private Boolean isRead = false;

  @Column
  @ElementCollection(fetch = FetchType.LAZY)
  @Default
  private List<String> pic = new ArrayList<>();

  @Column(nullable = false)
  @Setter
  private LocalDateTime availableAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sender_id")
  @Setter
  private Member sender;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "receiver_id")
  @Setter
  private Member receiver;

  @Default
  private Integer type = 1;

  @Override
  public int hashCode() {
    return Objects.hash(sender, receiver);
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof Letter) {
      Letter letter = (Letter) obj;
      return letter.getSender().getMemberId() == sender.getMemberId()
          && letter.getReceiver().getMemberId() == receiver.getMemberId();
    }
    return false;
  }
}
