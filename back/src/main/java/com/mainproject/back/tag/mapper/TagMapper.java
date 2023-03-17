package com.mainproject.back.tag.mapper;

import com.mainproject.back.tag.dto.TagSimpleDto;
import com.mainproject.back.tag.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface TagMapper {

  TagSimpleDto tagToTagSimpleDto(Tag tag);
}
