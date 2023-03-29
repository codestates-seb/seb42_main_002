import CursorTranslation from '../../Common/CursorTranslation/CursorTranslation';
import { TemplateType } from '../../../utils';
import styles from './LetterContent.module.scss';

type LetterContentProps = {
  receiver: string;
  body: string;
  type: number;
};

const LetterContent = ({ receiver, body, type }: LetterContentProps) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const template = TemplateType[type || 0];

  return (
    <div
      className={styles.letter}
      style={{ backgroundColor: template.bgColor }}
    >
      <div
        className={`${styles.letter_inner}`}
        style={{
          borderImage: `url(${template.url}) ${template.options}`,
        }}
      >
        <div className={styles.receiver_info}>
          <span className={styles.dear}>Dear</span>
          <span className={styles.receiver}>{receiver}</span>
        </div>
        <div className={styles.content}>
          <CursorTranslation>{body}</CursorTranslation>
        </div>
      </div>
    </div>
  );
};

export default LetterContent;
