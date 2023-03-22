package com.mainproject.back.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonExceptionCode implements ExceptionCode {
  TOKEN_NOT_REQUESTED(HttpStatus.BAD_REQUEST, "토큰이 없습니다.")
  ;

  private final HttpStatus status;
  private final String message;
}
