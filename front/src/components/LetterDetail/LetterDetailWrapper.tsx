import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedLetterState,
  selectedPictureIdx,
  userState,
} from '../../recoil/atoms';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { POST } from '../../utils/axios';
import { selectedLetterSelector } from '../../recoil/selectors/letter';
import LetterContent from './LetterContent/LetterContent';
import LetterPictureWrapper from './LetterPicture/LetterPictureWrapper';
import Button from '../Common/Button/Button';
import useModals from '../../hooks/useModals';
import PictureModal from '../PictureModal/PictureModal';
import styles from './LetterDetailWrapper.module.scss';

const LetterDetailWrapper = () => {
  const navigate = useNavigate();
  const { openModal } = useModals();
  const { letterId } = useParams();
  const getSelectedLetter = useRecoilValue(
    selectedLetterSelector(letterId || '')
  );
  const userInfo = useRecoilValue(userState);
  const setSelectedPictureIdx = useSetRecoilState(selectedPictureIdx);
  const [selectedLetter, setSelectedLetter] =
    useRecoilState(selectedLetterState);
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
      setSelectedLetter((prev) => ({
        ...prev,
        ...getSelectedLetter,
      }));

      setSelectLanguage({ ...selectLanguage, content: getSelectedLetter.body });
      setTranslatedLanguage(getSelectedLetter.body);
      if (getSelectedLetter.senderId !== userInfo?.memberId) {
        setIsShowButton(true);
      } else {
        setIsShowButton(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetailLetter();
  }, []);

  // TODO: userInfo가 없는 경우 처리
  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
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
      console.error(error);
    }
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguage({ ...selectLanguage, targetNation: event.target.value });
  };

  const ReplyButton = () => {
    const isActiveMember = selectedLetter.memberStatus !== 'MEMBER_QUIT';
    if (isShowButton && isActiveMember) {
      return (
        <Button variant="primary" size="lg" full to="/newletter">
          답장하기
        </Button>
      );
    }
    return <></>;
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
        receiver={selectedLetter.receiver}
        body={translatedLanguage}
        type={selectedLetter.type}
      />
      {/* 편지 사진 */}
      <LetterPictureWrapper
        pictures={selectedLetter.photoUrl}
        onClick={pictureClickHandler}
        isRead
      />
      {/* 답장 */}
      <ReplyButton />
    </div>
  );
};

export default LetterDetailWrapper;
