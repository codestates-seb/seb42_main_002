import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { letterTypeState, newLetterState } from '../../../recoil/atoms';
import { TemplateType } from '../../../utils';
import styles from './NewLetterContent.module.scss';

type NewLetterContentProps = {
  receiver: string;
  type?: number;
};

const NewLetterContent = ({ receiver }: NewLetterContentProps) => {
  // 새로 생성할 편지 데이터
  const [newLetter, setNewLetter] = useRecoilState(newLetterState);
  const [selectedLetterType, setSelectedLetterType] =
    useRecoilState(letterTypeState);
  const template = TemplateType[selectedLetterType || 0];

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNewLetter((prev) => ({
      ...prev,
      body: event.target.value,
      type: selectedLetterType,
    }));
  };

  /**
   * @deprecated 페이지 이동 시, 초기화
   */
  useEffect(() => {
    return () => {
      setSelectedLetterType(0);
      setNewLetter((prev) => ({
        ...prev,
        body: '',
        type: 0,
      }));
    };
  }, []);

  return (
    <div
      className={styles.letter}
      style={{ backgroundColor: template.bgColor }}
    >
      <div
        className={styles.letter_inner}
        style={{
          borderImage: `url(${template.url}) ${template.options}`,
        }}
      >
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
    </div>
  );
};

export default NewLetterContent;
