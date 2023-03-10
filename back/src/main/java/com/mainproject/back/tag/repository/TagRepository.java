package com.mainproject.back.tag.repository;

import com.mainproject.back.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
  public Tag findById(long tagId);
}
