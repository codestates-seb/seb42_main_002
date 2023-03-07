package com.mainproject.back.exception;

import org.springframework.http.HttpStatus;

public interface ExceptionCode {
  String getMessage();
  HttpStatus getStatus();
}
