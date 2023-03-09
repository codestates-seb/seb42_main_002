package com.mainproject.back.letter.mapper;

import com.mainproject.back.letter.dto.LetterListDto;
import com.mainproject.back.letter.dto.LetterPostDto;
import com.mainproject.back.letter.dto.LetterResponseDto;
import com.mainproject.back.letter.entity.Letter;
import com.mainproject.back.member.dto.MemberSimpleDto;
import com.mainproject.back.member.entity.Member;
import java.time.LocalDateTime;
import java.util.ArrayList;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LetterMapper {

  default Letter LetterPostDtoToLetter(LetterPostDto letterPostDto) {
    if (letterPostDto == null) {
      return null;
    } else {
      Letter.LetterBuilder letter = Letter.builder();
      letter.title(letterPostDto.getTitle());
      letter.body(letterPostDto.getBody());
      ArrayList<String> arrayList = letterPostDto.getPic();
      if (arrayList != null) {
        letter.pic(new ArrayList<>(arrayList));
      }
      letter.sender(Member.builder().memberId(letterPostDto.getSenderId()).build());
      letter.receiver(Member.builder().memberId(letterPostDto.getReceiverId()).build());
      return letter.build();
    }
  }

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

  default Page<LetterListDto> pageLetterToPageLetterListDtoPage(Page<Letter> letterPage) {
    return letterPage.map(this::letterToLetterListDto);
  }

  default LetterListDto letterToLetterListDto(Letter letter) {
    LetterListDto.LetterListDtoBuilder builder = LetterListDto.builder().letterId(letter.getLetterId())
        .sender(MemberSimpleDto.builder().memberId(letter.getSender().getMemberId())
            .name(letter.getReceiver().getName()).build())
        .receiver(MemberSimpleDto.builder().memberId(letter.getSender().getMemberId())
            .name(letter.getReceiver().getName()).build())
        .isRead(letter.getIsRead())
        .availableAt(letter.getAvailableAt())
        .createdAt(letter.getCreatedAt())
        .pic(letter.getPic());
    if(LocalDateTime.now().isAfter(letter.getAvailableAt())){
      builder.title(letter.getTitle())
          .body(letter.getBody());
    }
    return builder.build();
  }
}
