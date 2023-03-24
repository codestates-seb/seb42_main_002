import { Suspense, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  letterListState,
  newLetterState,
  selectedUserInfoState,
} from '../../../recoil/atoms';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import Letter from '../Letter/Letter';
import LetterUserCard from '../LetterUserCard/LetterUserCard';
import styles from './LetterList.module.scss';
import { letterPagiNationState } from '../../../recoil/atoms/pagination';
import { LetterListStateType } from '../../../utils';
import InnerSpinner from '../../Common/Spinner/InnerSpinner';
import NextLetterList from './NextLetterList';

const LetterList = () => {
  const navigate = useNavigate();
  const selectedUser = useRecoilValue(selectedUserInfoState);
  const setNewLetter = useSetRecoilState(newLetterState);
  const [letterList, setLetterList] = useRecoilState(letterListState);
  const setPagination = useSetRecoilState(letterPagiNationState);

  const addRecentData = (data: LetterListStateType) => {
    setLetterList((prev) => ({
      content: [...prev.content, ...data.content],
      isStop: data.isStop,
    }));
  };

  const resetList = () => {
    setLetterList({
      content: [],
      isStop: false,
    });
    setPagination(0);
  };

  /**
   * @description 페이지 이동 시, 초기화
   */
  useEffect(() => {
    resetList();
    return resetList;
  }, []);

  useEffect(() => {
    // 리다이렉트
    if (selectedUser.name === '') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    setNewLetter((prev) => ({
      ...prev,
      memberId: selectedUser.memberId,
      receiver: selectedUser.name,
    }));
  }, []);

  const emptyProps = {
    title: '아직 편지가 없어요.',
    icon: <SlEnvolopeLetter className={styles.icon} size={'6rem'} />,
  };
  return (
    <>
      <LetterUserCard
        birthday={selectedUser.birthday}
        location={selectedUser.location}
        name={selectedUser.name}
        profile={selectedUser.profile}
        memberId={selectedUser.memberId}
        cursor={false}
      />
      <ul className={styles.letter_wrapper}>
        {letterList.content.map((letter) => (
          <Letter
            selectedUser={selectedUser.name}
            sender={letter.sender.name}
            receiver={letter.receiver.name}
            body={letter.body}
            createdAt={letter.createdAt}
            hasPic={letter.hasPic}
            isRead={letter.isRead}
            key={letter.letterId}
            availableAt={letter.availableAt}
            letterId={letter.letterId}
          />
        ))}
        {/* 새로 불러오는 List */}
        <Suspense fallback={<InnerSpinner size="sm" />}>
          <NextLetterList
            addRecentData={addRecentData}
            empty={emptyProps}
            endText="마지막 스크롤 입니다."
          ></NextLetterList>
        </Suspense>
      </ul>
    </>
  );
};

export default LetterList;
