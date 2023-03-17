//package com.mainproject.back.member;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import com.google.gson.Gson;
//import com.mainproject.back.exception.BusinessLogicException;
//import com.mainproject.back.member.controller.MemberController;
//import com.mainproject.back.member.dto.MemberDto;
//import com.mainproject.back.member.entity.Member;
//import com.mainproject.back.member.entity.Member.Gender;
//import com.mainproject.back.member.exception.MemberExceptionCode;
//import com.mainproject.back.member.repository.MemberRepository;
//import com.mainproject.back.member.service.MemberConvertService;
//import java.security.Principal;
//import java.util.List;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestInstance;
//import org.junit.jupiter.api.TestInstance.Lifecycle;
//import org.mockito.Mock;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.transaction.annotation.Transactional;
//
//@SpringBootTest
//@Transactional
//@TestInstance(Lifecycle.PER_CLASS)
//public class MemberControllerTest {
//
//  private MockMvc mockMvc;
//
//  @Autowired
//  private MemberRepository memberRepository;
//
//  @Autowired
//  private MemberConvertService memberConvertService;
//
//  @Autowired
//  private Gson gson;
//
//  @Mock
//  private Principal principal;
//
//
//  @BeforeAll
//  void init() {
//    Member member1 = Member.builder().email("test1@test").password("test123!").gender(Gender.FEMALE)
//        .birthday("2000-11-11").name("test1").build();
//    List<String> tagNames1 = List.of("코딩", "요리", "영화");
//    Member member2 = Member.builder().email("test2@test").password("test123!").gender(Gender.FEMALE)
//        .birthday("2000-11-11").name("test2").build();
//    List<String> tagNames2 = List.of("코딩");
//    Member member3 = Member.builder().email("test3@test").password("test123!").gender(Gender.FEMALE)
//        .birthday("2000-11-11").name("test3").build();
//    List<String> tagNames3 = List.of("코딩", "요리");
//
//    memberConvertService.getMemberTag(member1, tagNames1);
//    memberConvertService.getMemberTag(member2, tagNames2);
//    memberConvertService.getMemberTag(member3, tagNames3);
//
//    memberRepository.save(member1);
//    memberRepository.save(member2);
//    memberRepository.save(member3);
//  }
//
//  @BeforeEach
//  void setUp(@Autowired MemberController memberController) {
//    // MockMvc
//    mockMvc = MockMvcBuilders.standaloneSetup(memberController)
//        .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
//        .build();
//  }
//
//  @Test
//  @DisplayName("회원 가입 중복 테스트")
//  public void saveDuplicatedMemberTest() throws Exception {
//    // given
//    MemberDto.Post post = MemberDto.Post.builder()
//        .email("test1@test")
//        .password("test123!")
//        .gender(Gender.FEMALE)
//        .birthday("2000-11-16")
//        .name("test")
//        .build();
//
//    String content = gson.toJson(post);
//
//    // when & then
//    assertThatThrownBy(
//        () -> mockMvc.perform(
//            post("/members")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content)))
//        .hasCause(new BusinessLogicException(MemberExceptionCode.EMAIL_EXISTS));
//  }
//
//  @Test
//  @DisplayName("회원 수정 테스트")
//  public void patchTest() throws Exception {
//    // given
//    MemberDto.Patch patch = MemberDto.Patch.builder()
//        .name("test11")
//        .build();
//
//    String content = gson.toJson(patch);
//    // when & then
//    when(principal.getName()).thenReturn("test1@test");
//
//    mockMvc.perform(
//            patch("/members")
//                .principal(principal)
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content))
//
//        .andExpect(status().isOk());
//
//    assertThat(memberRepository.findById(1L).get().getEmail()).isEqualTo("test1@test");
//    assertThat(memberRepository.findById(1L).get().getName()).isEqualTo("test11");
//    assertThat(memberRepository.findById(1L).get().getBirthday()).isEqualTo("2000-11-11");
//  }
//
//  @Test
//  @DisplayName("회원 정보 가져오기 테스트")
//  public void getTest() throws Exception {
//
//    long memberId = 2L;
//
//    // when & then
//    when(principal.getName()).thenReturn("test1@test");
//
//    mockMvc.perform(
//            get("/members/{member-id}", memberId)
//                .principal(principal)
//                .accept(MediaType.APPLICATION_JSON))
//
//        .andExpect(jsonPath("$.email").value("test2@test"))
//        .andExpect(jsonPath("$.name").value("test2"));
//  }
//
//  @Test
//  @DisplayName("회원 정보 삭제 테스트")
//  public void deleteTest() throws Exception {
//
//    // when & then
//    when(principal.getName()).thenReturn("test1@test");
//
//    mockMvc.perform(
//            delete("/members")
//                .principal(principal)
//                .accept(MediaType.APPLICATION_JSON))
//        .andExpect(status().isNoContent());
//
//  }
//
//  @Test
//  @DisplayName("추천 회원 조회 테스트")
//  public void recommendTest() throws Exception {
//
//    // when & then
//    when(principal.getName()).thenReturn("test1@test");
//
//    mockMvc.perform(
//            get("/members/recommend")
//                .principal(principal)
//                .accept(MediaType.APPLICATION_JSON))
//        .andExpect(status().isOk())
//        .andExpect(jsonPath("$.content").isArray())
//        .andExpect(jsonPath("$.content[0].name").value("test3"));
//  }
//
//  @Test
//  @DisplayName("태그별 회원 조회 테스트")
//  public void searchTest() throws Exception {
//
//    String tags = "요리";
//    // when & then
//    when(principal.getName()).thenReturn("test1@test");
//
//    mockMvc.perform(
//            get("/members/tag/{tags}", tags)
//                .principal(principal)
//                .characterEncoding("UTF-8") // mockMvc는 한글 지원을 안해줘서 따로 설정해야함
//                .accept(MediaType.APPLICATION_JSON))
//        .andExpect(status().isOk())
//        .andExpect(jsonPath("$.content").isArray());
//  }
//
//}
