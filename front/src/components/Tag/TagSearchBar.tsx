import styles from './AddTagPage.module.scss';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { TagDataType } from '../../utils/types/tags/tags';

export default function TagSearchBar({
  tags,
  filterHandler,
}: {
  tags: TagDataType[];
  filterHandler: any;
}) {
  const [innerText, setInnerText] = useState('');

  const onChangeHandler = (e: any) => {
    setInnerText(e.target.value);
    const filterArray = tags.filter((el) => {
      if (el.name !== undefined) return el.name.includes(e.target.value);
    });
    filterHandler(filterArray);
  };

  return (
    <div className={styles.input_container}>
      <input
        type="text"
        placeholder="검색"
        value={innerText}
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />
      <BsSearch className={styles.search_icon} />
    </div>
  );
}
