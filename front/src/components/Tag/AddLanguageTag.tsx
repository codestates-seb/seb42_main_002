import { useState } from 'react';
import { ReactComponent as CancelIcon } from '../../assets/CancelIcon.svg';
import TagSearchBar from './TagSearchBar';
import TagContainer from './TagContainer';
import styles from './AddTagPage.module.scss';
import { countryTags } from '../../dummy/Tags';

export default function AddLanguageTag() {
  const [list, SetList] = useState(countryTags);
  const [submitData, setSubmitData] = useState([]);
  const filterHandler = (e: any) => {
    SetList(e);
  };

  const clickDataHandler = (e: any) => {
    console.log(e);
    setSubmitData(e);
  };

  const submitHandler = () => {
    const sub = submitData.map((el: any) => {
      return { nation: el.name };
    });
    console.log(sub);
  };

  return (
    <div className={styles.container}>
      <CancelIcon
        onClick={() => {
          console.log('취소버튼클릭');
        }}
        className={styles.cancelIcon}
      />
      <TagSearchBar tags={countryTags} filterHandler={filterHandler} />
      <TagContainer tags={list} clickDataHandler={clickDataHandler} />
      <button onClick={submitHandler}>완료</button>
    </div>
  );
}
