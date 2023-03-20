package com.mainproject.back.image.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.mainproject.back.exception.BusinessLogicException;
import com.mainproject.back.image.dto.ImageDto;
import com.mainproject.back.image.exception.UploadExceptionCode;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {

  @Value("${spring.s3.bucket}")
  private String bucketName;
  private final AmazonS3Client amazonS3Client;

  public ImageDto uploadFiles(String fileType, MultipartFile multipartFile) {

    String uploadFilePath = fileType + "/";

    String originalFileName = multipartFile.getOriginalFilename();
    String uploadFileName = getUuidFileName(originalFileName);
    String uploadFileUrl;

    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentLength(multipartFile.getSize());
    objectMetadata.setContentType(multipartFile.getContentType());

    try (InputStream inputStream = multipartFile.getInputStream()) {

      String keyName = uploadFilePath + uploadFileName;
      amazonS3Client.putObject(
          new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata)
              .withCannedAcl(CannedAccessControlList.PublicRead));

      uploadFileUrl = amazonS3Client.getUrl(bucketName, keyName).toString();

    } catch (IOException e) {
      log.error("Filed upload failed", e);
      throw new BusinessLogicException(UploadExceptionCode.FILE_UPLOAD_FAILED);
    }

    return ImageDto.builder()
        .originalName(originalFileName)
        .uploadName(uploadFileName)
        .uploadPath(uploadFilePath)
        .uploadUrl(uploadFileUrl)
        .build();

  }

  public void deleteFile(String name) {
    boolean isExist = amazonS3Client.doesObjectExist(bucketName, name);
    if (isExist) {
      amazonS3Client.deleteObject(bucketName, name);
    } else {
      throw new BusinessLogicException(UploadExceptionCode.FILE_NOT_EXISTS);
    }
  }

  public String getUuidFileName(String fileName) {
    String ext = fileName.substring(fileName.indexOf(".") + 1);
    return UUID.randomUUID() + "." + ext;
  }
}
