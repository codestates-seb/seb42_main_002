package com.mainproject.back.exception.advice;

import com.google.gson.Gson;
import com.mainproject.back.exception.BusinessLogicException;
import java.util.Map;
import javax.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleMethodArgumentNotValidException(
      MethodArgumentNotValidException e) {
    final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

    return response;
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleConstraintViolationException(
      ConstraintViolationException e) {
    final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

    return response;
  }

  @ExceptionHandler
  public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
    final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

    return new ResponseEntity<>(response, e.getExceptionCode().getStatus());
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleHttpMessageNotReadableException(
      HttpMessageNotReadableException e) {

    final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());

    return response;
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleMissingServletRequestParameterException(
      MissingServletRequestParameterException e) {

    final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
        e.getMessage());

    return response;
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleHttpClientErrorException(HttpClientErrorException e){
    Gson gson = new Gson();
    Map<String, String> map = gson.fromJson(e.getResponseBodyAsString(), Map.class);
    final ErrorResponse response = ErrorResponse.of(e.getStatusCode(), map.get("errorMessage"));
    return response;
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ErrorResponse handleException(Exception e) {
    log.error("# handle Exception: {}", e.getMessage());
    // TODO logback 적용 후 discord4j 넣어봐도 재밌을 듯!!!

    final ErrorResponse response = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);

    return response;
  }
}
