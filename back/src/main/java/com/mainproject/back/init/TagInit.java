package com.mainproject.back.init;

import com.mainproject.back.tag.entity.Tag;
import com.mainproject.back.tag.repository.TagRepository;
import java.util.List;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class TagInit {

  private final Init init;

  @PostConstruct
  public void initTag() {
    init.initTag();
  }

}

@Component
@RequiredArgsConstructor
class Init {

  private final TagRepository tagRepository;

  @Transactional
  public void initTag() {
    List<Tag> tags = List.of(
        Tag.builder().name("코딩").build(),
        Tag.builder().name("게임").build(),
        Tag.builder().name("일러스트").build(),
        Tag.builder().name("테크").build(),
        Tag.builder().name("언어").build(),
        Tag.builder().name("영화").build(),
        Tag.builder().name("반려동물").build(),
        Tag.builder().name("자연").build(),
        Tag.builder().name("환경").build(),
        Tag.builder().name("글쓰기").build(),
        Tag.builder().name("뷰티").build(),
        Tag.builder().name("헬스").build(),
        Tag.builder().name("음악").build(),
        Tag.builder().name("춤").build(),
        Tag.builder().name("디자인").build(),
        Tag.builder().name("패션").build(),
        Tag.builder().name("자동차").build(),
        Tag.builder().name("건축").build(),
        Tag.builder().name("여행").build(),
        Tag.builder().name("사진").build(),
        Tag.builder().name("요리").build(),
        Tag.builder().name("경제").build(),
        Tag.builder().name("주식").build(),
        Tag.builder().name("SF&미래").build(),
        Tag.builder().name("교육").build(),
        Tag.builder().name("가족").build(),
        Tag.builder().name("육아").build(),
        Tag.builder().name("역사").build(),
        Tag.builder().name("철학").build(),
        Tag.builder().name("과학").build(),
        Tag.builder().name("종교").build(),
        Tag.builder().name("정치").build(),
        Tag.builder().name("소설").build(),
        Tag.builder().name("문화").build(),
        Tag.builder().name("스포츠").build()
    );
    tagRepository.saveAll(tags);
  }

}
