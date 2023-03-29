package com.mainproject.back.letter;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.google.gson.Gson;
import com.mainproject.back.letter.controller.LetterController;
import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.letter.repository.LetterRepository;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.entity.Member.Gender;
import com.mainproject.back.member.repository.MemberRepository;
import java.security.Principal;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@TestInstance(Lifecycle.PER_CLASS)
public class LetterControllerTest {

  private MockMvc mockMvc;

  @Autowired
  private Gson gson;

  @Autowired
  private LetterRepository letterRepository;

  @Autowired
  private MemberRepository memberRepository;

  @Mock
  private Principal principal;

  @BeforeAll
  void init() {
    Member member1 = Member.builder().email("test1@test").password("test123!").gender(Gender.FEMALE)
        .birthday("2000-11-11").name("test1").location("KR").build();
    Member member2 = Member.builder().email("test2@test").password("test123!").gender(Gender.FEMALE)
        .location("US")
        .birthday("2000-11-11").name("test2").build();

    Letter letter = Letter.builder().body("test").type(1)
        .receiver(Member.builder().memberId(1).build())
        .sender(Member.builder().memberId(2).build())
        .availableAt(LocalDateTime.now().plusHours(5))
        .build();

    memberRepository.save(member1);
    memberRepository.save(member2);
    letterRepository.save(letter);
  }

  @BeforeEach
  void setUp(@Autowired LetterController letterController) {
    // MockMvc
    mockMvc = MockMvcBuilders.standaloneSetup(letterController)
        .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
        .build();
  }

  @Test
  @DisplayName("편지 보내기 테스트")
  public void postLetter() throws Exception {
    long receiverId = 1L;

    LetterPostDto post = LetterPostDto.builder().body("test").type(1).build();
    String content = gson.toJson(post);

    when(principal.getName()).thenReturn("test2@test");

    ResultActions actions =
        mockMvc.perform(
            post("/letters/{receiver-id}", receiverId)
                .contentType(MediaType.APPLICATION_JSON)
                .principal(principal)
                .content(content)
        );
    actions
        .andExpect(status().isCreated());
  }

  @Test
  @DisplayName("열람 시간이 아닌 특정 편지 조회 테스트")
  public void getLetter() throws Exception {

    long letterId = 1L;

    ResultActions actions =
        mockMvc.perform(get("/letters/{letter-id}", letterId)
            .accept(MediaType.APPLICATION_JSON)
        );

    actions
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.body").isEmpty());
  }

  @Test
  @DisplayName("특정 멤버와 주고 받은 편지 리스트 조회 테스트")
  public void getLettersByMember() throws Exception {

    long memberId = 2L;

    when(principal.getName()).thenReturn("test1@test");

    ResultActions actions =
        mockMvc.perform(get("/letters/members/{member-id}", memberId)
            .accept(MediaType.APPLICATION_JSON)
            .principal(principal)
        );

    actions
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray());
  }

  @Test
  @DisplayName("나와 편지를 주고 받은 멤버 리스트 조회")
  public void getMembersByLetter() throws Exception {

    when(principal.getName()).thenReturn("test1@test");

    ResultActions actions =
        mockMvc.perform(get("/letters")
            .accept(MediaType.APPLICATION_JSON)
            .principal(principal)
        );

    actions
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray());
  }

  @Test
  @DisplayName("도착한 편지 개수 조회 조회")
  public void getArrivedLetterCount() throws Exception {

    when(principal.getName()).thenReturn("test1@test");

    ResultActions actions =
        mockMvc.perform(get("/letters/arrived")
            .accept(MediaType.APPLICATION_JSON)
            .principal(principal)
        );

    actions
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.count").value(1));
  }
}
