package com.mainproject.back.vocabulary.exception;

import com.mainproject.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum VocabExceptionCode implements ExceptionCode {

  VOCAB_NOT_FOUND(HttpStatus.NOT_FOUND, "단어를 찾을 수 없습니다."),
  ;

  private final HttpStatus status;
  private final String message;
}
