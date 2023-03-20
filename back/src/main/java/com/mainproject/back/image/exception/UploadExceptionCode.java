package com.mainproject.back.image.exception;

import com.mainproject.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UploadExceptionCode implements ExceptionCode {

  FILE_NOT_EXISTS(HttpStatus.NOT_FOUND, "파일이 S3에 존재하지 않습니다."),
  FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 실패");

  private final HttpStatus status;
  private final String message;
}
