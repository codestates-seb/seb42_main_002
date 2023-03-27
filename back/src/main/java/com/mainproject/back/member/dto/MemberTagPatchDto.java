package com.mainproject.back.member.dto;

import io.swagger.annotations.ApiModel;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("회원 태그수정")
public class MemberTagPatchDto {

  @NotNull
  private List<MemberTagDto> memberTags;

}
