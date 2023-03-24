import CursorTranslation from '../../Common/CursorTranslation/CursorTranslation';
import styles from './LetterContent.module.scss';

type LetterContentProps = {
  receiver: string;
  body: string;
  type: string;
};

const LetterContent = ({ receiver, body, type }: LetterContentProps) => {
  return (
    // classnames로 변경하기
    <div className={`${styles.letter} ${styles[`type${type}`]}`}>
      <div className={styles.receiver_info}>
        <span className={styles.dear}>Dear</span>
        <span className={styles.receiver}>{receiver}</span>
      </div>
      <div className={styles.content}>
        <CursorTranslation>{body}</CursorTranslation>
      </div>
    </div>
  );
};

export default LetterContent;
