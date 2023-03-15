import {LanguageDataType} from '../../../utils/types/common/common.type';
import LanguageListItem from './LanguageListItem';
import styles from './LanguageListItem.module.scss';

type LanguageListProps = {
  languages: LanguageDataType[];
};

const LanguageList = ({ languages }: LanguageListProps) => {
  return (
    <div className={styles.container}>
      {languages &&
        languages.map((language) => (
          <LanguageListItem item={language} key={language.nation} />
        ))}
    </div>
  );
};

export default LanguageList;
