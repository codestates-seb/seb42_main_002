package com.mainproject.back.letter.repository;

import com.mainproject.back.letter.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterRepository extends JpaRepository<Letter, Long> {

}
