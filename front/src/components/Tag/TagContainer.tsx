import { useState } from 'react';
import styles from './AddTagPage.module.scss';
import { TagDataType } from '../../utils/types/tags/tags';

export default function TagContainer({
  tags,
  clickDataHandler,
}: {
  tags: TagDataType[];
  clickDataHandler: any;
}) {
  const [select, setSelect] = useState<TagDataType[]>([]);

  const clickHandler = (el: TagDataType) => {
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
