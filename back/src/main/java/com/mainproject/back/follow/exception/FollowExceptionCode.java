package com.mainproject.back.follow.exception;

import com.mainproject.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FollowExceptionCode implements ExceptionCode {

  FOLLOW_NOT_FOUND(HttpStatus.NOT_FOUND, "친구 목록에 없습니다."),
  ;

  private final HttpStatus status;
  private final String message;
}
