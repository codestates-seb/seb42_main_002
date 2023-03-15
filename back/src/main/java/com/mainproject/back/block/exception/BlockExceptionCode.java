package com.mainproject.back.block.exception;

import com.mainproject.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum BlockExceptionCode implements ExceptionCode {

  BLOCK_NOT_FOUND(HttpStatus.NOT_FOUND, "차단 목록이 존재하지 않습니다."),
  ;

  private final HttpStatus status;
  private final String message;
}
