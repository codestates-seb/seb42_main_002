import styles from './Tags.module.scss';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { TagDataType } from '../../../utils/types/tags/tags';

export default function TagSearchBar({
  tags,
  filterHandler,
}: // tag === Tag List (id, name 키값을 가진 객체 데이터!)
// filterHandler === 부모에서 함수를 프롭스로 내려주면 필터링된 tag데이터를 부모한테 보내줌!
{
  tags: TagDataType[];
  filterHandler: (filterArray: TagDataType[]) => void;
}) {
  const [innerText, setInnerText] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInnerText(e.target.value);
    const filterArray = tags.filter((el) => {
      if (el.name !== undefined) return el.name.includes(e.target.value);
    });
    filterHandler(filterArray);
    //필터링된 tag데이터를 부모한테 보내줌!
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
