import TagsModal from '../Common/Tags/TagsModal';
import {hobbyTags, languageTags, nationalityTags} from '../../dummy/Tags';

// 첫 국적 선택 모달
export function FirstNationality() {
  return (
    <>
      <TagsModal
        TagData={nationalityTags}
        icon="back"
        text="firstNationality"
        btn="next"
      />
    </>
  );
}

// 첫 언어선택 모달
export function FirstLanguage() {
  return (
    <>
      <TagsModal TagData={languageTags} icon="back" text="none" btn="none" />
    </>
  );
}

// 첫 취미 선택 모달
export function FirstHobby() {
  return (
    <>
      <TagsModal TagData={hobbyTags} icon="back" text="firstHobby" btn="add" />
    </>
  );
}
