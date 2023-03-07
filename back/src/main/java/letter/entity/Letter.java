package letter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Letter {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String letterId;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  @Lob
  private String body;

  @Column(nullable = false)
  private String available_at;

//  @OneToMany(mappedBy = "member")
//  private Member member;
}
