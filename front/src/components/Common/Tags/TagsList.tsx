import {useState} from 'react';
import styles from './Tags.module.scss';
import {TagDataType} from '../../../utils/types/tags/tags';

export default function TagsList({
  tags,
  clickDataHandler,
}: {
  tags: TagDataType[];
  clickDataHandler: (a: TagDataType[]) => void;
  // 랜더링할 tags데이터임. (id, name으로 이루워진 객체데이터)
}) {
  const [select, setSelect] = useState<TagDataType[]>([]);

  const clickHandler = (el: TagDataType): void => {
    if (!select.includes(el)) {
      setSelect([...select, el]);
      clickDataHandler([...select, el]);
    } else {
      setSelect(select.filter((button) => button !== el));
      clickDataHandler(select.filter((button) => button !== el));
    }
  };

  return (
    <div className={styles.tag_container}>
      {tags.map((el: TagDataType, index: number) => {
        return (
          <button
            key={index}
            className={
              select.includes(el) ? `${styles.tagClick}` : `${styles.tag}`
            }
            onClick={() => {
              clickHandler(el);
            }}
          >
            <span className={styles.name}>{el.name}</span>
            <span className={styles.englishName}>{el.englishName}</span>
          </button>
        );
      })}
    </div>
  );
}
