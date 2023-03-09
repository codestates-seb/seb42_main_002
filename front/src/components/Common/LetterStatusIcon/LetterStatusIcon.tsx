import { ReactComponent as Receive } from '../../../assets/img/letter_receive.svg';
import { ReactComponent as Send } from '../../../assets/img/letter_send.svg';

import styles from './LetterStatusIcon.module.scss';

type LetterStatusIconProps = {
  status?: 'SENT' | 'RECEIVED';
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
  read?: boolean;
};

const LetterStatusIcon = ({
  status = 'SENT',
  onClick,
  read = false,
}: LetterStatusIconProps) => {
  // 조건부 렌더링 같은 경우 어떤 식으로 하는 게 좋을지
  const Icons = {
    SENT: <Send />,
    RECEIVED: (
      <>
        {read && <div className={styles.read_flag}></div>}
        <Receive />
      </>
    ),
  };

  return (
    <div className={styles.letter_state}>
      {/* 상태에 따른 아이콘 */}
      <button onClick={onClick}>{Icons[status]}</button>
    </div>
  );
};

export default LetterStatusIcon;
