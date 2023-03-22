package com.mainproject.back.util;

import java.util.LinkedHashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class ApiManager {

  // 네이버 api client id와 secret키
  @Value("${papago.client-id}")
  private String clientID;
  @Value("${papago.client-secret}")
  private String SECRET;

  // 네이버 api 주소
  private final String DETECT_URL = "https://openapi.naver.com/v1/papago/detectLangs?query=";
  private final String TRANSLATE_URL = "https://openapi.naver.com/v1/papago/n2mt?";


  // 1. 입력 단어의 언어인식
  public String getWordLang(String word) {
    String langCode = null;

    try {
      String apiUrl = DETECT_URL + word;
      RestTemplate restTemplate = new RestTemplate();
      HttpHeaders headers = new HttpHeaders();
      headers.set("X-Naver-Client-Id", clientID);
      headers.set("X-Naver-Client-Secret", SECRET);
      HttpEntity<?> entity = new HttpEntity<>(headers);
      ResponseEntity<Map> resultMap1 = restTemplate.exchange(apiUrl, HttpMethod.POST, entity,
          Map.class);
      langCode = (String) resultMap1.getBody().get("langCode");

    } catch (RestClientException e) {
      log.info(e.getMessage());
    }

    return langCode;
  }

  // 2. 입력 단어 번역
  public String getWordMeaning(String word, String target, String langCode) {
    String meaning = null;
    if (target.equals("CN") || target.equals("cn")) {
      target = "zh-CN";
    } else {
      target = target.toLowerCase();
    }
    if (langCode.equals("CN") || langCode.equals("cn")) {
      langCode = "zh-CN";
    } else {
      langCode = langCode.toLowerCase();
    }

    if(langCode.equals(target)) return word;

    String apiUrl = TRANSLATE_URL + "source=" + langCode + "&target=" + target + "&text=" + word;
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    HttpEntity<?> entity = new HttpEntity<>(headers);
    headers.set("X-Naver-Client-Id", clientID);
    headers.set("X-Naver-Client-Secret", SECRET);
    ResponseEntity<Map> resultMap2 = restTemplate.exchange(apiUrl, HttpMethod.POST, entity,
        Map.class);

    LinkedHashMap message = (LinkedHashMap) resultMap2.getBody().get("message");
    LinkedHashMap result = (LinkedHashMap) message.get("result");

    meaning = (String) result.get("translatedText");

    return meaning;
  }
}
