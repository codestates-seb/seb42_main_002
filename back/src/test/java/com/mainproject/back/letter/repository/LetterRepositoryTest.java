package com.mainproject.back.letter.repository;

import static org.hamcrest.MatcherAssert.assertThat;

import com.mainproject.back.letter.entity.Letter;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class LetterRepositoryTest {

  @Autowired
  private LetterRepository letterRepository;

  @Test
  public void createLetterTest() {
    Letter letter = Letter.builder().title("title").body("body").availableAt(LocalDateTime.now())
        .build();

    Letter savedLetter = letterRepository.save(letter);

    assertThat(savedLetter, is(notNullValue()));
    assertThat(savedLetter.getTitle(), is(letter.getTitle()));
    assertThat(savedLetter.getBody(), is(letter.getBody()));
  }

  @Test
  public void findLetterTest() {
    Letter letter = Letter.builder().title("title").body("body").availableAt(LocalDateTime.now())
        .build();

    Letter savedLetter = letterRepository.save(letter);
    Optional<Letter> findLetter = letterRepository.findById(savedLetter.getLetterId());

    assertThat(findLetter.isEmpty(), is(false));
    assertThat(findLetter.get().getTitle(), is(letter.getTitle()));
  }
}
