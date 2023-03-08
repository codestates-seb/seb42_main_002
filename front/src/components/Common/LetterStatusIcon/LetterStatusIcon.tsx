import { ReactComponent as Receive } from '../../../assets/img/letter_receive.svg';
import { ReactComponent as Send } from '../../../assets/img/letter_send.svg';
import { LETTER_STATUS } from '../../../utils/enums';

import styles from './LetterStatusIcon.module.scss';

type LetterStatusIconProps = {
  status: LETTER_STATUS;
  onClick: () => void;
};

const LetterStatusIcon = () => {
  return (
    <div className={styles.letter_state}>
      {/* 상태에 따른 아이콘 */}
      <div className={styles.read_flag}></div>
      <Receive />
      {/* <Send /> */}
    </div>
  );
};

export default LetterStatusIcon;
