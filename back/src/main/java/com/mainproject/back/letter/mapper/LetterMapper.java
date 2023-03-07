package com.mainproject.back.letter.mapper;

import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LetterMapper {

  Letter LetterPostDtoToLetter(LetterPostDto letterPostDto);

  LetterResponseDto LetterToLetterResponseDto(Letter letter);
}
