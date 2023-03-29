package com.mainproject.back.security.handler;

import com.google.gson.Gson;
import com.mainproject.back.exception.advice.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {  // (1)
  @Override
  public void onAuthenticationFailure(HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException exception) throws IOException {
    // 인증 실패 시, 에러 로그를 기록하거나 error response를 전송할 수 있다.
    log.error("# Authentication failed: {}", exception.getMessage());


    sendErrorResponse(response, exception);  // (2)
  }

  private void sendErrorResponse(HttpServletResponse response, AuthenticationException exception) throws IOException {
    Gson gson = new Gson();     // (2-1)
    ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, exception.getMessage()); // (2-2)
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);    // (2-3)
    response.setStatus(HttpStatus.UNAUTHORIZED.value());          // (2-4)
    response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));   // (2-5)
  }
}
