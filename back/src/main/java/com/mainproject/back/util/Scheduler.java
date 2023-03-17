package com.mainproject.back.util;

import com.mainproject.back.vocabulary.controller.VocabController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduler {

  private static final Logger logger;

  static {
    try {
      logger = LoggerFactory.getLogger(
          String.valueOf(VocabController.class.getMethod("todayVocab", long.class, Pageable.class)));
    } catch (NoSuchMethodException e) {
      throw new RuntimeException(e);
    }
  }

  @Scheduled(fixedDelay = 30000)
  public void  tdv () {

  }

}
