package com.mainproject.back.vocabulary;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.google.gson.Gson;
import com.mainproject.back.letter.controller.LetterController;
import com.mainproject.back.letter.dto.LetterListDto;
import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.controller.MemberController;
import com.mainproject.back.member.dto.MemberSimpleDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.entity.Member.Gender;
import com.mainproject.back.member.repository.MemberRepository;
import com.mainproject.back.member.service.MemberService;
import com.mainproject.back.vocabulary.controller.VocabController;
import com.mainproject.back.vocabulary.dto.VocabDto;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import com.mainproject.back.vocabulary.mapper.VocabMapper;
import com.mainproject.back.vocabulary.repository.VocabRepository;
import com.mainproject.back.vocabulary.service.VocabService;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@TestInstance(Lifecycle.PER_CLASS)
public class VocabularyControllerTest {

  private MockMvc mockMvc;

  @Autowired
  private Gson gson;

  @Mock
  private Principal principal;

  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  private VocabRepository vocabRepository;

  @BeforeAll
  void init() {
    Member member1 = Member.builder().email("test1@test").password("test123!").gender(Gender.FEMALE)
        .birthday("2000-11-11").name("test1").build();
    Vocabulary vocab1 = Vocabulary.builder().word("test").meaning("시험").nation("US")
        .member(Member.builder().memberId(1).build()).build();

    memberRepository.save(member1);
    vocabRepository.save(vocab1);
  }

  @BeforeEach
  void setUp(@Autowired VocabController vocabController) {
    // MockMvc
    mockMvc = MockMvcBuilders.standaloneSetup(vocabController)
        .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
        .build();
  }

  @Test
  public void postVocab() throws Exception {

    VocabDto.Post post = VocabDto.Post.builder().word("apple").meaning("사과").nation("US").build();
    String content = gson.toJson(post);

    when(principal.getName()).thenReturn("test1@test");

    ResultActions actions =
        mockMvc.perform(
            post("/vocabs")
                .contentType(MediaType.APPLICATION_JSON)
                .principal(principal)
                .content(content)
        );
    actions
        .andExpect(status().isCreated());
  }

  @Test
  public void patchVocab() throws Exception {
    long vocabId = 1L;

    VocabDto.Patch patch = VocabDto.Patch.builder().word("test").meaning("test").nation("EN")
        .build();
    String content = gson.toJson(patch);

    when(principal.getName()).thenReturn("test1@test");

    ResultActions actions =
        mockMvc.perform(
            patch("/vocabs/{vocab-id}", vocabId)

                .contentType(MediaType.APPLICATION_JSON)
                .principal(principal)
                .content(content)
        );
    actions
        .andExpect(status().isOk());
  }

  @Test
  public void getVocabs() throws Exception {

    when(principal.getName()).thenReturn("test1@test");

    ResultActions actions =
        mockMvc.perform(get("/vocabs")
            .accept(MediaType.APPLICATION_JSON)
            .principal(principal)
        );

    actions
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray());
  }

  @Test
  public void getVocab() throws Exception {
    long vocabId = 1L;

    ResultActions actions =
        mockMvc.perform(get("/vocabs/{vocab-id}", vocabId)
            .accept(MediaType.APPLICATION_JSON)
        );

    actions
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.word").value("test"));
  }

  @Test
  public void deleteVocab() throws Exception {
    long vocabId = 1L;

    ResultActions actions =
        mockMvc.perform(delete("/vocabs/{vocab-id}", vocabId)
            .accept(MediaType.APPLICATION_JSON)
        );

    actions
        .andExpect(status().isOk());

  }

  @Test
  public void todayVocab() throws Exception {
    when(principal.getName()).thenReturn("test1@test");

    ResultActions actions =
        mockMvc.perform(get("/vocabs/random")
            .accept(MediaType.APPLICATION_JSON)
            .principal(principal)
        );

    actions
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray());
  }

}
