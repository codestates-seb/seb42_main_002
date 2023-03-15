package com.mainproject.back.language.repository;

import com.mainproject.back.language.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Long> {

}
