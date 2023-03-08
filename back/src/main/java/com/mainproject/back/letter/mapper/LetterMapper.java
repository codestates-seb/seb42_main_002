package com.mainproject.back.letter.mapper;

import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LetterMapper {

  Letter LetterPostDtoToLetter(LetterPostDto letterPostDto);

  default LetterResponseDto LetterToLetterResponseDto(Letter letter) {
    if (letter == null) {
      return null;
    }
    LetterResponseDto responseDto = LetterResponseDto.builder().letterId(letter.getLetterId())
        .title(letter.getTitle())
        .body(letter.getBody())
        .createdAt(letter.getCreatedAt())
        .availableAt(letter.getAvailableAt())
        .build();
    if (letter.getSender() == null) {
      responseDto.setSender(null);
    } else {
      responseDto.setSender(letter.getSender().getName());
    }
    if (letter.getReceiver() == null) {
      responseDto.setReceiver(null);
    } else {
      responseDto.setReceiver(letter.getReceiver().getName());
    }
    return responseDto;
  }
}
