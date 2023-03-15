package com.mainproject.back.letter.exception;

import com.mainproject.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum LetterExceptionCode implements ExceptionCode {

  LETTER_NOT_FOUND(HttpStatus.NOT_FOUND, "편지를 찾을 수 없습니다."),
  // TODO 구현하면서 필요한 에러 추가
  ;

  private final HttpStatus status;
  private final String message;
}
