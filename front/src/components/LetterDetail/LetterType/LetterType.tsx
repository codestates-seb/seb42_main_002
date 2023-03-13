import type1 from '../../../assets/img/letter_type/type_01.svg';
import type2 from '../../../assets/img/letter_type/type_02.svg';

import styles from './LetterType.module.scss';

type TypeProps = {
  url: string;
};

const type: string[] = [type1, type2];

const Type = ({ url }: TypeProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${url})` }}
      className={styles.type}
    ></div>
  );
};

// TODO : 어떻게 레터 타입을 저장할 것인지
const LetterType = () => {
  return (
    <div className={styles.types}>
      {type.map((item) => (
        <Type url={item} key={item} />
      ))}
    </div>
  );
};

export default LetterType;
