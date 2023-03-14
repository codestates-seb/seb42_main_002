import { useState, ChangeEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import { TagDataType } from '../../utils/types/tags/tags';
import styles from './AddTagPage.module.scss';

type TagSearchBarProps = {
  tags: TagDataType[];
  filterHandler: (filteredTags: TagDataType[]) => void;
};

const TagSearchBar = ({ tags, filterHandler }: TagSearchBarProps) => {
  const [innerText, setInnerText] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
};

export default TagSearchBar;
