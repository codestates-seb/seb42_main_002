import { ReactComponent as BackIcon } from '../../assets/BackIcon.svg';
import { useState } from 'react';
import { hobbyTags } from '../../dummy/Tags';
import styles from './AddTagPage.module.scss';
import TagSearchBar from './TagSearchBar';
import TagContainer from './TagContainer';

export default function HobbyTagPage() {
  const [list, SetList] = useState(hobbyTags);

  const filterHandler = (e: any) => {
    SetList(e);
  };
  const clickDataHandler = (e: any) => {
    console.log(e);
  };
  return (
    <div className={styles.container}>
      <BackIcon
        onClick={() => {
          console.log('취소버튼클릭');
        }}
        className={styles.back_Icon}
      />
      <p className={styles.hobby_tag_title}>관심 있는 주제의 태그를</p>
      <p className={styles.hobby_tag_title}>선택하세요</p>
      <TagSearchBar tags={hobbyTags} filterHandler={filterHandler} />
      <TagContainer tags={list} clickDataHandler={clickDataHandler} />
    </div>
  );
}
