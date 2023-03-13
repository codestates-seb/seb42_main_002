import { ReactComponent as BackIcon } from '../../../assets/BackIcon.svg';
import { ReactComponent as CancelIcon } from '../../../assets/CancelIcon.svg';
import { useState } from 'react';
import styles from './Tags.module.scss';
import TagSearchBar from './TagSearchBar';
import TagsList from './TagsList';
import { TagDataType } from '../../../utils/types/tags/tags';
import Button from '../Button/Button';

export default function TagsModal({
  TagData,
  icon,
  text,
  btn,
}: {
  TagData: TagDataType[];
  icon: 'back' | 'cancel';
  text: 'firstNationality' | 'firstHobby' | 'none';
  btn: 'add' | 'next' | 'none';
}) {
  const [list, SetList] = useState(TagData);

  const TextHandler = () => {
    if (text === 'firstNationality') {
      return (
        <>
          <p className={styles.hobby_tag_title}>국적 혹은 모국어를 사용하는</p>
          <p className={styles.hobby_tag_title}>나라를 선택하세요</p>
        </>
      );
    } else if (text === 'firstHobby') {
      return (
        <>
          <p className={styles.hobby_tag_title}>관심 있는 주제의 태그를</p>
          <p className={styles.hobby_tag_title}>선택하세요</p>
        </>
      );
    } else if (text === 'none') {
      return null;
    }
  };

  const filterHandler = (e: TagDataType[]): void => {
    SetList(e);
  };

  const clickDataHandler = (e: TagDataType[]): void => {
    console.log(e);
  };

  return (
    <div className={styles.container}>
      {icon === 'back' ? (
        <BackIcon className={styles.back_Icon} />
      ) : (
        <CancelIcon className={styles.cancelIcon} />
      )}
      {TextHandler()}
      <TagSearchBar tags={TagData} filterHandler={filterHandler} />
      <TagsList tags={list} clickDataHandler={clickDataHandler} />
      {btn === 'add' ? (
        <div className={styles.bottom_btn}>
          <Button variant="primary" size="lg" full={true}>
            추가
          </Button>
        </div>
      ) : btn === 'next' ? (
        <div className={styles.bottom_btn}>
          <Button variant="secondary" size="lg" full={true}>
            다음
          </Button>
        </div>
      ) : (
        <button>임시</button>
      )}
    </div>
  );
}
