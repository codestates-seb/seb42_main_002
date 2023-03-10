package com.mainproject.back.tag.entity;

import com.mainproject.back.member.tag.MemberTag;
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
public class Tag {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int tagId;

  @Column
  private String name;

  @OneToMany(mappedBy = "tag")
  private List<MemberTag> memberTags = new ArrayList<>();
}
