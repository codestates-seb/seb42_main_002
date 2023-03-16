import styles from './SearchTag.module.scss';

type SearchTagProps = {
  tag: string;
  type: 'lang' | 'default';
};
const SearchTag = ({ tag, type }: SearchTagProps) => {
  return <span className={`${styles.tag} ${styles[type]}`}>{tag}</span>;
};

export default SearchTag;
