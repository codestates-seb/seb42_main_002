package com.mainproject.back.letter.repository;

import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.entity.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class LetterRepositoryTest {

  @Autowired
  private LetterRepository letterRepository;

  @BeforeEach
  public void init() {

  }

  @Test
  public void findMemberByLetterTest() {

  }
}
