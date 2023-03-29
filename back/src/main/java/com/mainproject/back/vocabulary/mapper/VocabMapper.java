package com.mainproject.back.vocabulary.mapper;

import com.mainproject.back.member.dto.MemberSimpleDto;
import com.mainproject.back.vocabulary.dto.VocabDto;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VocabMapper {

  Vocabulary vocabPostToVocab(VocabDto.Post requestBody);

  Vocabulary vocabPatchToVocab(VocabDto.Patch requestBody);

  VocabDto.Response vocabToResponse(Vocabulary vocabulary);

  default Page<VocabDto.Response> pageVocabToPageVocabResponsePage(Page<Vocabulary> vocabPage) {
    return vocabPage.map(this::vocabToVocabResponse);
  }

  default VocabDto.Response vocabToVocabResponse(Vocabulary vocab) {
    VocabDto.Response response = VocabDto.Response
        .builder()
        .vocabId(vocab.getVocabId())
        .member(MemberSimpleDto.builder().memberId(vocab.getMember().getMemberId())
            .name(vocab.getMember().getName()).memberStatus(vocab.getMember().getMemberStatus()).build())
        .word(vocab.getWord())
        .createdAt(vocab.getCreatedAt())
        .meaning(vocab.getMeaning())
        .nation(vocab.getNation())
        .build();
    return response;
  }

  default List<VocabDto.Response> vocabsToVocabResponses(List<Vocabulary> vocabs) {
    return vocabs
        .stream()
        .map(vocab -> VocabDto.Response
            .builder()
            .vocabId(vocab.getVocabId())
            .word(vocab.getWord())
            .createdAt(vocab.getCreatedAt())
            .meaning(vocab.getMeaning())
            .nation(vocab.getNation())
            .build())
        .collect(Collectors.toList());
  }

}


