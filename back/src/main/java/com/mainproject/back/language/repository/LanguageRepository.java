package com.mainproject.back.language.repository;

import com.mainproject.back.language.dto.LanguageSimpleDto;
import com.mainproject.back.language.entity.Language;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LanguageRepository extends JpaRepository<Language, Long> {

  @Query("select new com.mainproject.back.language.dto.LanguageSimpleDto(l.languageId, l.nation) from Language l")
  List<LanguageSimpleDto> findAllSimpleLanguages();
}
