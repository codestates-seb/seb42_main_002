import TagsModal from '../Common/Tags/TagsModal';
import { nationalityTags, languageTags, hobbyTags } from '../../dummy/Tags';

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

export function FirstLanguage() {
  return (
    <>
      <TagsModal TagData={languageTags} icon="back" text="none" btn="none" />
    </>
  );
}

export function FirstHobby() {
  return (
    <>
      <TagsModal TagData={hobbyTags} icon="back" text="firstHobby" btn="add" />
    </>
  );
}
