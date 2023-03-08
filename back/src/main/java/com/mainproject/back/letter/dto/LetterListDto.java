package com.mainproject.back.letter.dto;

import com.mainproject.back.member.dto.MemberSimpleDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class LetterListDto {

  private long letterId;
  private MemberSimpleDto sender;
  private MemberSimpleDto receiver;
  private String title;
  private String body;
  private LocalDateTime availableAt;
  private LocalDateTime createdAt;
  private List<String> pic;
}
