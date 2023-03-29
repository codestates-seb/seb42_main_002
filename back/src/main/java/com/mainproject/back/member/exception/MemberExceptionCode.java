package com.mainproject.back.member.exception;

import com.mainproject.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberExceptionCode implements ExceptionCode {


  MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다."),
  MEMBER_NOT_ALLOWED(HttpStatus.FORBIDDEN, "권한이 없습니다."),
  EMAIL_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다.");

  private final HttpStatus status;
  private final String message;
}
