package com.mainproject.back.language.exception;

import com.mainproject.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum LanguageExceptionCode implements ExceptionCode {

  LANGUAGE_EXISTS(HttpStatus.FOUND, "언어가 이미 추가되었습니다."),
  LANGUAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "추가 가능한 언어가 아닙니다.");

  private final HttpStatus status;
  private final String message;
}
