import { useRecoilState } from 'recoil';
import { newLetterState } from '../../../recoil/atoms';
import styles from './NewLetterContent.module.scss';

type NewLetterContentProps = {
  receiver: string;
};

const NewLetterContent = ({ receiver }: NewLetterContentProps) => {
  // 새로 생성할 편지 데이터
  const [newLetter, setNewLetter] = useRecoilState(newLetterState);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    console.log('편지 내용 작성');
    setNewLetter((prev) => ({ ...prev, body: event.target.value }));
  };

  return (
    <div className={styles.letter}>
      <div className={styles.receiver_info}>
        <span className={styles.dear}>Dear</span>
        <span className={styles.receiver}>{receiver}</span>
      </div>
      {/* 임시 textarea */}
      <textarea
        className={styles.body}
        onChange={onChangeHandler}
        value={newLetter.body}
      />
    </div>
  );
};

export default NewLetterContent;
