import styles from './NewLetterContent.module.scss';

type NewLetterContentProps = {
  body: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  receiver: string;
};

const NewLetterContent = ({
  body,
  onChange,
  receiver,
}: NewLetterContentProps) => {
  return (
    <div className={styles.letter}>
      <div className={styles.receiver_info}>
        <span className={styles.dear}>Dear</span>
        <span className={styles.receiver}>{receiver}</span>
      </div>
      {/* 임시 textarea */}
      <textarea className={styles.body} onChange={onChange} value={body} />
    </div>
  );
};

export default NewLetterContent;
