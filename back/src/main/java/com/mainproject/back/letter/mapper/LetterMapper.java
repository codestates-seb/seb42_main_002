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
      letter.body(letterPostDto.getBody());
      ArrayList<String> arrayList = letterPostDto.getPic();
      if (arrayList != null) {
        letter.photoUrl(new ArrayList<>(arrayList));
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
    LetterResponseDto.LetterResponseDtoBuilder builder = LetterResponseDto.builder()
        .letterId(letter.getLetterId())
        .createdAt(letter.getCreatedAt())
        .availableAt(letter.getAvailableAt());
    if (letter.getSender() == null) {
      builder.sender(null);
    } else {
      builder.sender(letter.getSender().getName());
    }
    if (letter.getReceiver() == null) {
      builder.receiver(null);
    } else {
      builder.receiver(letter.getReceiver().getName());
    }
    if(letter.getAvailableAt().isBefore(LocalDateTime.now())) builder.body(letter.getBody());

    return builder.build();
  }

  default Page<LetterListDto> pageLetterToPageLetterListDtoPage(Page<Letter> letterPage) {
    return letterPage.map(this::letterToLetterListDto);
  }

  default LetterListDto letterToLetterListDto(Letter letter) {
    LetterListDto.LetterListDtoBuilder builder = LetterListDto.builder()
        .letterId(letter.getLetterId())
        .sender(MemberSimpleDto.builder().memberId(letter.getSender().getMemberId())
            .name(letter.getSender().getName()).build())
        .receiver(MemberSimpleDto.builder().memberId(letter.getReceiver().getMemberId())
            .name(letter.getReceiver().getName()).build())
        .isRead(letter.getIsRead())
        .availableAt(letter.getAvailableAt())
        .createdAt(letter.getCreatedAt());
    if (LocalDateTime.now().isAfter(letter.getAvailableAt())) {
      builder.body(letter.getBody());
    }
    if (letter.getPhotoUrl() == null || letter.getPhotoUrl().isEmpty()) {
      builder.hasPic(false);
    } else {
      builder.hasPic(true);
    }
    return builder.build();
  }
}
