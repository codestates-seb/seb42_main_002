package com.mainproject.back.util;

import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.exception.CommonExceptionCode;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@Slf4j
public class Util {

  public static String checkPrincipal(Principal principal) {
    if (principal == null) {
      log.info("## 토큰이 들어오지 않는다..");
      throw new BusinessLogicException(CommonExceptionCode.TOKEN_NOT_REQUESTED);
    }
    log.info("## 토큰 들어옴: {}", principal.getName());
    return principal.getName();
  }

  public static <T> Page<T> ListToPage(Collection<T> collection, Pageable pageable,
      Comparator<T> comparator) {
    int start = (int) pageable.getOffset();
    int end = Math.min((start + pageable.getPageSize()), collection.size());
    List<T> list = new ArrayList<>(collection);
    if (comparator != null) {
      list.sort(comparator);
    }
    Page<T> page = new PageImpl<>(list.subList(start, end), pageable, list.size());
    return page;
  }
}
