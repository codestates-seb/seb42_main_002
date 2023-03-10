package com.mainproject.back.member.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.mainproject.back.member.entity.Member;
import com.mainproject.back.member.language.MemberLanguage;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

public class MemberDto {

  @Getter
  @Setter
  @AllArgsConstructor
  @JsonInclude(Include.NON_NULL)
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
    @Nullable
    private String introduce;
    @NotNull
    private String location;
    @NotNull
    private Member.Gender gender;
    @Nullable
    private String profile;

    @Valid
    private List<MemberTagDto> memberTags;

    @Nullable
    private Member.MemberStatus memberStatus;
  }

  @Getter
  @AllArgsConstructor
  public static class Response {

    private int memberId;
    private String name;
    private String email;
    private Member.Gender gender;
    private String location;
    private String birthday;
    private String profile;
    private List<MemberLanguage> language;
    private List<MemberTagResponseDto> tag;
    private Member.MemberStatus memberStatus;

    public String getMemberStatus() {
      return memberStatus.getStatus();
    }
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
    private List<MemberLanguage> language;
    private Member.MemberStatus memberStatus;
  }
}
