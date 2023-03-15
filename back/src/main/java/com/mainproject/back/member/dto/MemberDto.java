package com.mainproject.back.member.dto;

import com.mainproject.back.language.dto.MemberLanguageDto;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.tag.dto.TagSimpleDto;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MemberDto {

  @Getter
  @AllArgsConstructor
  @Builder
  public static class Post {

    @NotNull(message = "공백 불가")
    private String name;
    @NotNull(message = "공백 불가")
    @Email
    private String email;
    @NotNull
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$", message = "최소 8자 이상 20자 이하 영문,특수문자혼용")
    private String password;
    @NotNull
    @Pattern(regexp = "^(19[0-9][0-9]|20\\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$")
    private String birthday;
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
    @Setter
    private boolean isFriend;
    private List<MemberLanguageDto> language;
    private List<TagSimpleDto> tag;
    private Member.MemberStatus memberStatus;
  }

  @Getter
  @Builder
  @AllArgsConstructor
  public static class Patch {

    @Setter
    private long memberId;
    private String name;
    private String introduce;
    private String profile;
    private String location;
    private List<MemberLanguageDto> language;
    private List<String> tag;
    private Member.MemberStatus memberStatus;
  }
}
