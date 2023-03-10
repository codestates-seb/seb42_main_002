package com.mainproject.back.vocabulary.repository;

import com.mainproject.back.vocabulary.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocabRepository extends JpaRepository<Vocabulary, Long> {

}
