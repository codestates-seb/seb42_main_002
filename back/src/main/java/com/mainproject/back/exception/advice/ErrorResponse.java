package com.mainproject.back.exception.advice;


import com.mainproject.back.exception.ExceptionCode;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.ConstraintViolation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

@Getter
public class ErrorResponse {

  private HttpStatus status;
  private String message;
  private List<FieldError> fieldErrors;
  private List<ConstraintViolationError> violationErrors;

  private ErrorResponse(HttpStatus status, String message) {
    this.status = status;
    this.message = message;
  }

  private ErrorResponse(final List<FieldError> fieldErrors,
      final List<ConstraintViolationError> violationErrors) {
    this.fieldErrors = fieldErrors;
    this.violationErrors = violationErrors;
  }

  public static ErrorResponse of(BindingResult bindingResult) {
    return new ErrorResponse(FieldError.of(bindingResult), null);
  }

  public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
    return new ErrorResponse(null, ConstraintViolationError.of(violations));
  }

  public static ErrorResponse of(ExceptionCode exceptionCode) {
    return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
  }

  public static ErrorResponse of(HttpStatus httpStatus) {
    return new ErrorResponse(httpStatus, httpStatus.getReasonPhrase());
  }

  public static ErrorResponse of(HttpStatus httpStatus, String message) {
    return new ErrorResponse(httpStatus, message);
  }

  @Getter
  @RequiredArgsConstructor
  public static class FieldError {

    private final String field;
    private final Object rejectedValue;
    private final String reason;


    public static List<FieldError> of(BindingResult bindingResult) {
      final List<org.springframework.validation.FieldError> fieldErrors =
          bindingResult.getFieldErrors();
      return fieldErrors.stream()
          .map(error -> new FieldError(
              error.getField(),
              error.getRejectedValue() == null ?
                  "" : error.getRejectedValue().toString(),
              error.getDefaultMessage()))
          .collect(Collectors.toList());
    }
  }

  @Getter
  @RequiredArgsConstructor
  public static class ConstraintViolationError {

    private final String propertyPath;
    private final Object rejectedValue;
    private final String reason;

    public static List<ConstraintViolationError> of(
        Set<ConstraintViolation<?>> constraintViolations) {
      return constraintViolations.stream()
          .map(constraintViolation -> new ConstraintViolationError(
              constraintViolation.getPropertyPath().toString(),
              constraintViolation.getInvalidValue().toString(),
              constraintViolation.getMessage()
          )).collect(Collectors.toList());
    }
  }
}
