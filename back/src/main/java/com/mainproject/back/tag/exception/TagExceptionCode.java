package com.mainproject.back.tag.exception;

import com.mainproject.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TagExceptionCode implements ExceptionCode {

  TAG_EXISTS(HttpStatus.FOUND, "태그가 이미 추가되었습니다."),
  TAG_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 태그입니다.");

  private final HttpStatus status;
  private final String message;
}
