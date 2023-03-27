package com.mainproject.back.member.dto;

import com.mainproject.back.language.dto.MemberLanguageDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.tag.dto.TagSimpleDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class MemberDto {

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  @ApiModel("회원가입")
  public static class Post {

    @ApiModelProperty(value="사용자의 이름", example = "이코딩", required = true)
    @NotNull(message = "공백 불가")
    private String name;
    @ApiModelProperty(value = "사용자의 이메일", example = "lee@gmail.com", required = true)
    @NotNull(message = "공백 불가")
    @Email
    private String email;
    @ApiModelProperty( value = "사용자의 비밀번호", example = "dlzheld123!@#", required = true)
    @NotNull
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$", message = "최소 8자 이상 20자 이하 영문, 특수문자혼용")
    private String password;

    @ApiModelProperty(value="사용자의 생년월일", example = "1991-01-01", required = true)
    @NotNull
    @Pattern(regexp = "^(19[0-9][0-9]|20\\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$")
    private String birthday;


    @ApiModelProperty(example = "FEMALE" ,value="사용자의 성별", required = true)
    @NotNull
    private Member.Gender gender;
  }

  @Getter
  @AllArgsConstructor
  @Builder
  public static class Response {

    private long memberId;
    private String name;
    private String email;
    private Member.Gender gender;
    private String location;
    private String birthday;
    private String profile;
    private String introduce;
    @Setter
    private boolean isFriend;
    @Setter
    private boolean isBlock;
    private List<MemberLanguageDto> language;
    private List<TagSimpleDto> tag;
    private Member.MemberStatus memberStatus;
  }

  @Getter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  @ApiModel("회원 정보수정 ")
  public static class Patch {
    @Setter
    private long memberId;

    @ApiModelProperty(example = "존 코딩")
    private String name;

    @ApiModelProperty(example = "안녕하세요")
    private String introduce;

    private String profile;

    @ApiModelProperty(example = "서울")
    private String location;

    @ApiModelProperty(example = "MALE")
    private String gender;
    private List<MemberLanguageDto> language;
    private List<String> tag;
    private Member.MemberStatus memberStatus;
  }
}
