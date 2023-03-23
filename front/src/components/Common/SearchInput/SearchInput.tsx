import { useState, ChangeEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './SearchInput.module.scss';

type SearchInputProps = {
  items: any[];
  filterKey: string;
  filterHandler: (filteredItems: any[]) => void;
};

const SearchInput = ({ items, filterKey, filterHandler }: SearchInputProps) => {
  const [value, setValue] = useState('');

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const filteredItems = items.filter((item) => {
      if (item[filterKey] !== undefined)
        return item[filterKey].toLowerCase().includes(event.target.value);
    });
    filterHandler(filteredItems);
  };

  return (
    <div className={styles.input_container}>
      <input
        type="text"
        placeholder="검색"
        value={value}
        onChange={onChangeHandler}
      />
      <BsSearch className={styles.search_icon} />
    </div>
  );
};

export default SearchInput;
