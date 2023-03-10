package com.mainproject.back.vocabulary.mapper;

import com.mainproject.back.vocabulary.dto.VocabDto;
import com.mainproject.back.vocabulary.dto.VocabDto.Response;
import com.mainproject.back.vocabulary.entity.Vocabulary;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VocabMapper {

  Vocabulary vocabPostToVocab(VocabDto.Post requestBody);

  Vocabulary vocabPatchToVocab(VocabDto.Patch requestBody);

  default VocabDto.Response vocabToVocabResponse(Vocabulary vocab) {
    VocabDto.Response response =VocabDto.Response
        .builder()
        .vocabId(vocab.getVocabId())
        .word(vocab.getWord())
        .createdAt(vocab.getCreatedAt())
        .meaning(vocab.getMeaning())
        .langCode(vocab.getLangCode())
        .memberId(vocab.getMember().getMemberId())
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
            .langCode(vocab.getLangCode())
            .memberId(vocab.getMember().getMemberId())
            .build())
        .collect(Collectors.toList());
  }

}


