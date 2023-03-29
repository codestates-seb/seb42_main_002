import { LANGUAGE_CODE } from '../../../utils';
import { langTransformer } from '../../../utils/common';
import styles from './SearchTag.module.scss';

type SearchTagProps = {
  tag: LANGUAGE_CODE | string;
  type: 'lang' | 'default';
};
const SearchTag = ({ tag, type }: SearchTagProps) => {
  return (
    <span className={`${styles.tag} ${styles[type]}`}>
      {type === 'lang' && langTransformer(tag as LANGUAGE_CODE)}
      {type === 'default' && tag}
    </span>
  );
};

export default SearchTag;
