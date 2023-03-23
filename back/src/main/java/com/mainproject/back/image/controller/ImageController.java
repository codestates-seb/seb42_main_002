package com.mainproject.back.image.controller;

import com.mainproject.back.image.dto.ImageDto;
import com.mainproject.back.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
@Slf4j
public class ImageController {

  private final ImageService imageService;

  @PostMapping("/users/me/profiles/upload")
  public ResponseEntity<Object> uploadProfile(
      @RequestPart(value = "image") MultipartFile multipartFile) {
    log.info("## 프로필 업로드: {}", multipartFile.getOriginalFilename());
    ImageDto imageDto = imageService.uploadFiles("profiles", multipartFile);
    return ResponseEntity.ok().body(imageDto);
  }

  @PostMapping("/users/me/letters/photos/upload")
  public ResponseEntity<Object> uploadLetterPhoto(
      @RequestPart(value = "image") MultipartFile multipartFile) {
    log.info("## 편지 이미지 업로드: {}", multipartFile.getOriginalFilename());
    ImageDto imageDto = imageService.uploadFiles("photos", multipartFile);
    return ResponseEntity.ok().body(imageDto);
  }

  @DeleteMapping("/image")
  public ResponseEntity<Object> deleteFile(
      @RequestParam("url") String keyName) {
    log.info("## 이미지 삭제: {}", keyName);
    imageService.deleteFile(keyName);
    return ResponseEntity.ok().build();
  }
}
