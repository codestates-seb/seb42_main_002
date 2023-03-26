import { useSetRecoilState } from 'recoil';
import { selectedLetterState } from '../../../recoil/atoms';
import { formatDateToHour, getLetterOpenTime } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { ko } from 'date-fns/locale';

import { ReactComponent as HasPick } from '../../../assets/img/letter_status/attachment.svg';
import { ReactComponent as Unread } from '../../../assets/img/letter_status/unread.svg';
import { ReactComponent as Read } from '../../../assets/img/letter_status/read.svg';
import { ReactComponent as Send } from '../../../assets/img/letter_status/send.svg';
import { ReactComponent as EmptyEnvelope } from '../../../assets/img/common/icon_empty_envelope.svg';
import { ReactComponent as EmptyEnvelopeLocks } from '../../../assets/img/common/icon_locks.svg';

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
  memberStatus?: string;
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
  memberStatus,
}: LetterProps) => {
  // 편지 열람이 불가능한 경우
  if (!body) {
    return (
      <li className={`${styles.letter} ${styles.lock}`}>
        <div className={styles.open_time}>
          <span>{getLetterOpenTime(new Date(availableAt), 'KR')}</span>
        </div>
        <div className={styles.locksLetter}>
          <EmptyEnvelope />
          <span className={styles.locks_wrapper}>
            <span className={styles.locks}>
              <EmptyEnvelopeLocks />
            </span>
          </span>
        </div>
        <div className={styles.letter_info}>{sender}</div>
      </li>
    );
  }

  const naviagte = useNavigate();
  const setSelectedLetterState = useSetRecoilState(selectedLetterState);

  const clickLetterHandler = () => {
    // 편지 상세페이지로 이동
    naviagte(`${letterId}`);
    // 선택한 편지의 작성자 상태 저장(탈퇴 여부)
    setSelectedLetterState((prev) => ({
      ...prev,
      memberStatus,
    }));
  };

  // 편지 열람 가능한 경우
  return (
    <li
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
    </li>
  );
};

export default Letter;
