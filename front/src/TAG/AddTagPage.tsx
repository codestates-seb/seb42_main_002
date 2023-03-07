import styles from './AddTagPage.module.scss';
import { ReactComponent as CancelIcon } from './CancelIcon.svg';
import { BsSearch } from 'react-icons/bs';

const tags = [
  { name: '日本語', englishName: 'Japanese' },
  { name: 'English', englishName: 'English' },
  { name: '中文', englishName: 'Chinese' },
  { name: 'Nederlands', englishName: 'Dutch' },
  { name: 'Eesti', englishName: 'Estonian' },
  { name: 'Deutsch', englishName: 'German' },
  { name: 'Haitian Creole', englishName: 'Haitian' },
  { name: '日本語', englishName: 'Japanese' },
  { name: 'English', englishName: 'English' },
  { name: '中文', englishName: 'Chinese' },
  { name: 'Nederlands', englishName: 'Dutch' },
  { name: 'Eesti', englishName: 'Estonian' },
  { name: 'Deutsch', englishName: 'German' },
  { name: 'Haitian Creole', englishName: 'Haitian' },
  { name: '日本語', englishName: 'Japanese' },
  { name: 'English', englishName: 'English' },
  { name: '中文', englishName: 'Chinese' },
  { name: 'Nederlands', englishName: 'Dutch' },
  { name: 'Eesti', englishName: 'Estonian' },
  { name: 'Deutsch', englishName: 'German' },
  { name: 'Haitian Creole', englishName: 'Haitian' },
  { name: '日本語', englishName: 'Japanese' },
  { name: 'English', englishName: 'English' },
  { name: '中文', englishName: 'Chinese' },
  { name: 'Nederlands', englishName: 'Dutch' },
  { name: 'Eesti', englishName: 'Estonian' },
  { name: 'English', englishName: 'English' },
  { name: '中文', englishName: 'Chinese' },
  { name: 'Nederlands', englishName: 'Dutch' },
  { name: 'Eesti', englishName: 'Estonian' },
];
console.log(tags.length);

export default function AddTagPage() {
  return (
    <div className={styles.container}>
      <CancelIcon
        onClick={() => {
          console.log('취소버튼클릭');
        }}
        className={styles.cancelIcon}
      />
      <div className={styles.input_container}>
        <input type="text" placeholder="검색" />
        <BsSearch className={styles.search_icon} />
      </div>
      <div className={styles.tag_container}>
        {tags.map((el) => {
          return (
            <>
              <div className={styles.tag}>
                <span className={styles.name}>{el.name}</span>
                <span className={styles.englishName}>{el.englishName}</span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
