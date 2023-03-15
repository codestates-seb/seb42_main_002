package com.mainproject.back.language.service;

import com.mainproject.back.language.entity.Language;
import com.mainproject.back.language.repository.LanguageRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LanguageService {

  private final LanguageRepository languageRepository;

  public List<Language> findAllLanguages() {
    return languageRepository.findAll();
  }
}
