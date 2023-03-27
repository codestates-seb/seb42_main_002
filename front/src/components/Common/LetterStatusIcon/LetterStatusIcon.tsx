import { ReactComponent as Receive } from '../../../assets/img/letter_receive.svg';
import { ReactComponent as Send } from '../../../assets/img/letter_send.svg';

import styles from './LetterStatusIcon.module.scss';

type LetterStatusIconProps = {
  status?: 'SENT' | 'RECEIVED';
  isRead?: boolean;
};

const LetterStatusIcon = ({ status, isRead }: LetterStatusIconProps) => {
  const Icons = {
    SENT: (
      <>
        {!isRead && <div className={styles.read_flag}></div>}

        <Send />
      </>
    ),
    RECEIVED: (
      <>
        {!isRead && <div className={styles.read_flag}></div>}
        <Receive />
      </>
    ),
  };

  return (
    <>
      {/** 편지 상태 정보 있을 경우에만 노출 */}
      {status && (
        <div className={styles.letter_state}>
          {/* 상태에 따른 아이콘 */}
          <div>{Icons[status]}</div>
        </div>
      )}
    </>
  );
};

export default LetterStatusIcon;
