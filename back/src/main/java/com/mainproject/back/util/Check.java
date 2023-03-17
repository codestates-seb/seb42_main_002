package com.mainproject.back.util;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.exception.CommonExceptionCode;
import java.security.Principal;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Check {

  public static String checkPrincipal(Principal principal) {
    if (principal == null) {
      log.info("## 토큰이 들어오지 않는다..");
      throw new BusinessLogicException(CommonExceptionCode.TOKEN_NOT_REQUESTED);
    }
    log.info("## 토큰 들어옴: {}", principal.getName());
    return principal.getName();
  }
}
