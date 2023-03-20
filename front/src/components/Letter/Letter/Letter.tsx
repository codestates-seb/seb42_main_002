import { useAuth } from '../../../context/AuthContext';
import { formatDateToHour, getLetterOpenTime } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { ko } from 'date-fns/locale';

import { ReactComponent as HasPick } from '../../../assets/img/letter_status/attachment.svg';
import { ReactComponent as Unread } from '../../../assets/img/letter_status/unread.svg';
import { ReactComponent as Read } from '../../../assets/img/letter_status/read.svg';
import { ReactComponent as Send } from '../../../assets/img/letter_status/send.svg';

import styles from './Letter.module.scss';

type LetterProps = {
  sender: string; // 보낸 사람
  receiver: string; // 받는 사람
  isRead: boolean; // 읽음 여부
  hasPic: boolean; // 이미지 첨부 확인
  body: string; // 내용
  createdAt: string; // 편지 생성 날짜
  availableAt: string; // 편지 읽을 수 있는 날짜
  letterId: number;
  selectedUser: string;
};

type LetterStatusProps = {
  selectedUser: string;
  sender: string;
  isRead: boolean;
  hasPic: boolean;
};

const LetterStatus = ({
  selectedUser,
  sender,
  isRead,
  hasPic,
}: LetterStatusProps) => {
  if (selectedUser !== sender) {
    return (
      <>
        <Send />
        {hasPic && <HasPick />}
      </>
    );
  }

  return (
    <>
      {isRead ? <Read /> : <Unread />}
      {hasPic && <HasPick />}
    </>
  );
};

// 유저별 단일 카드 컴포넌트
const Letter = ({
  sender,
  body,
  isRead,
  hasPic,
  createdAt,
  availableAt,
  letterId,
  selectedUser,
}: LetterProps) => {
  // 편지 열람이 불가능한 경우
  if (!body) {
    return (
      <div className={`${styles.letter} ${styles.lock}`}>
        <div className={styles.open_time}>
          {getLetterOpenTime(new Date(availableAt), 'KR')}
        </div>
        <div>자물쇠</div>
        <div className={styles.letter_info}>{sender}</div>
      </div>
    );
  }

  const naviagte = useNavigate();

  const clickLetterHandler = () => {
    // 편지 상세페이지로 이동
    naviagte(`${letterId}`);
  };

  // 편지 열람 가능한 경우
  return (
    <div
      className={styles.letter}
      onClick={clickLetterHandler}
      role="presentation"
    >
      {/* 편지 상태 */}
      <div className={styles.letter_status}>
        <LetterStatus
          selectedUser={selectedUser}
          sender={sender}
          isRead={isRead}
          hasPic={hasPic}
        />
      </div>
      {/* 편지 내용 프리뷰 */}
      <div className={styles.letter_body}>{body}</div>
      {/* 시간 / 보낸사람 */}
      <div className={styles.letter_info}>
        <span className={styles.time}>
          {formatDateToHour(new Date(createdAt), ko)}
        </span>
        {sender}
      </div>
    </div>
  );
};

export default Letter;
