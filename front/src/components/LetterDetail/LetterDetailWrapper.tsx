import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  newLetterState,
  selectedLetterState,
  selectedPictureIdx,
} from '../../recoil/atoms';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET, POST } from '../../utils/axios';
import { SeletedLetterDataType } from '../../utils';
import LetterContent from './LetterContent/LetterContent';
import LetterPictureWrapper from './LetterPicture/LetterPictureWrapper';
import Button from '../Common/Button/Button';
import useModals from '../../hooks/useModals';
import PictureModal from '../PictureModal/PictureModal';

import styles from './LetterDetailWrapper.module.scss';

const LetterDetailWrapper = () => {
  const { openModal } = useModals();
  const { letterId } = useParams();

  const setSelectedPictureIdx = useSetRecoilState(selectedPictureIdx);
  // TODO: 리코일 setter사용 시, 페이지 접속 시 바로 렌더링이 되지않음.
  const [selectedLetter, setSelectedLetter] =
    useRecoilState(selectedLetterState);
  const newLetter = useRecoilValue(newLetterState);
  const [letter, setLetter] = useState<SeletedLetterDataType>(selectedLetter);
  const [isShowButton, setIsShowButton] = useState<boolean>(false);
  const [selectLanguage, setSelectLanguage] = useState({
    content: selectedLetter.body,
    targetNation: 'en',
  });
  const [translatedLanguage, setTranslatedLanguage] = useState(
    selectedLetter.body
  );
  /**
   * @description API
   */
  const getDetailLetter = async () => {
    try {
      const { data } = await GET(`/users/me/letters?letter=${letterId}`);

      setSelectedLetter(data);
      setLetter(data);
      setSelectLanguage({ ...selectLanguage, content: data.body });
      setTranslatedLanguage(data.body);
      if (data.receiver !== newLetter.receiver) {
        setIsShowButton(true);
      } else {
        setIsShowButton(false);
      }
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  useEffect(() => {
    getDetailLetter();
  }, []);

  // 사진 확대 핸들러
  const pictureClickHandler = (idx: number) => {
    setSelectedPictureIdx(idx);
    openModal(PictureModal);
  };

  // 파파고 번역 기능
  const translateHandler = () => {
    translate(selectLanguage);
  };

  async function translate(data: { [key: string]: string }) {
    try {
      const response = await POST('/translate', data);
      setTranslatedLanguage(response.data.content);
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguage({ ...selectLanguage, targetNation: event.target.value });
  };

  return (
    <div className={styles.wrapper}>
      {/* 파파고 버튼 */}
      <div className={styles.translate}>
        <select className={styles.select_box} onChange={onChangeHandler}>
          <option value="en">영어</option>
          <option value="ko">한국어</option>
          <option value="ja">일본어</option>
          <option value="cn">중국어</option>
        </select>
        <Button variant="secondary" size="sm" onClick={translateHandler}>
          파파고 번역
        </Button>
      </div>
      {/* 편지 내용 */}
      <LetterContent
        receiver={letter.receiver}
        body={translatedLanguage}
        type={letter.type}
      />
      {/* 편지 사진 */}
      <LetterPictureWrapper
        pictures={letter.photoUrl}
        onClick={pictureClickHandler}
        isRead
      />
      {/* 답장 */}
      {/* 버튼 고민 */}
      {isShowButton && (
        <Button variant="primary" size="lg" full to="/newletter">
          답장하기
        </Button>
      )}
    </div>
  );
};

export default LetterDetailWrapper;
