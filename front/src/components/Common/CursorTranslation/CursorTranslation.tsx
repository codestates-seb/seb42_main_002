import { useState, useEffect } from 'react';
import styles from './CursorTranslation.module.scss';
import { POST } from '../../../utils/axios';
import { toast } from '../../../utils';
import { useRecoilState } from 'recoil';
import { IsModalOpen, IsIconOpen } from '../../../recoil/atoms/Translate/index';

export default function CursorTranslation({ children }: { children: string }) {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [translateLanguge, setTranslateLanguge] = useState({
    content: '',
    targetNation: 'ko',
  });
  const [resultText, setResultText] = useState('');
  const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpen);
  const [isIconOpen, setIsIconOpen] = useRecoilState(IsIconOpen);

  const handleMouseUp = (event: any) => {
    //onMouseUp event 타입 진짜모르겠네요..
    if (isModalOpen) {
      return;
    }
    const text = window.getSelection()?.toString() || '';
    setSelectedText(text);
    setTranslateLanguge({
      ...translateLanguge,
      targetNation: 'ko',
    });
    if (text) {
      setPosition({
        x: event.nativeEvent.offsetX + 15,
        y: event.nativeEvent.offsetY + 8,
      });
    }
  };

  const onClickHandler = () => {
    setIsModalOpen(true);
    setIsIconOpen(false);
  };

  useEffect(() => {
    if (selectedText) {
      setIsIconOpen(true);
      setTranslateLanguge({ ...translateLanguge, content: selectedText });
    } else {
      setIsIconOpen(false);
    }
  }, [selectedText]);

  useEffect(() => {
    if (isModalOpen) {
      translate(translateLanguge);
    }
  }, [isModalOpen, translateLanguge]);

  const languageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTranslateLanguge({
      ...translateLanguge,
      targetNation: event.target.value,
    });
  };

  async function translate(data: { [key: string]: string }) {
    try {
      const response = await POST('/translate', data);
      setResultText(response.data.content);
    } catch (error) {
      alert(error);
    }
  }

  const addVacaHandler = () => {
    addVaca({
      word: translateLanguge.content,
      targetNation: translateLanguge.targetNation,
    });
  };

  async function addVaca(data: { [key: string]: string }) {
    try {
      await POST('/vocabs', data);
      toast.success('단어를 추가하였습니다!');
      setIsModalOpen(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div
        className={styles.containner}
        onClick={() => {
          setIsIconOpen(false);
          if (isModalOpen) {
            setIsModalOpen(false);
          }
        }}
        role="presentation"
      >
        <div
          className={isIconOpen ? styles.button : styles.hidden}
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
          role="presentation"
          onClick={onClickHandler}
        ></div>

        {isModalOpen ? (
          <div
            className={styles.modle}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            role="presentation"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className={styles.text_box}>
              <p>{selectedText}</p>
              <select
                className={styles.select_languge}
                onChange={languageSelect}
              >
                <option value="ko">KO:</option>
                <option value="en">EN:</option>
                <option value="ja">JA:</option>
                <option value="cn">CN:</option>
              </select>
              <p>{resultText}</p>
            </div>
            <button className={styles.modal_btn} onClick={addVacaHandler}>
              단어장 추가
            </button>
          </div>
        ) : (
          <></>
        )}
        <p
          onMouseUp={handleMouseUp}
          role="presentation"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {children}
        </p>
      </div>
    </>
  );
}
