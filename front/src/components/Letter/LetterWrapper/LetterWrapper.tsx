import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { newLetterState, selectedUserInfoState } from '../../../recoil/atoms';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { GET } from '../../../utils/axios';
import { LetterDataType } from '../../../utils';
import Letter from '../Letter/Letter';
import LetterUserCard from '../LetterUserCard/LetterUserCard';
import Empty from '../../Common/Empty/Empty';

import styles from './LetterWrapper.module.scss';
// import { lettersData } from '../../../dummy/letter';

const LetterWrapper = () => {
  const navigate = useNavigate();
  const selectedUser = useRecoilValue(selectedUserInfoState);
  const setNewLetter = useSetRecoilState(newLetterState);
  const [page, setPage] = useState<number>(0);
  const [userLetterList, setUserLetterList] = useState<LetterDataType[]>([]);

  const getUserLetterList = async (memberId: number) => {
    try {
      // TODO: 페이지네이션 보류
      const { data } = await GET(`letters/members/${memberId}`);
      setUserLetterList(data.content);
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  useEffect(() => {
    // 리다이렉트
    if (selectedUser.name === '') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (!selectedUser.memberId) {
      return;
    }
    getUserLetterList(selectedUser.memberId);
  }, []);

  // 선택한 유저 정보 저장
  useEffect(() => {
    setNewLetter((prev) => ({
      ...prev,
      memberId: selectedUser.memberId,
      receiver: selectedUser.name,
    }));
  }, []);

  if (userLetterList.length === 0) {
    return (
      <Empty title="아직 편지가 없어요.">
        <SlEnvolopeLetter className={styles.icon} size={'6rem'} />
      </Empty>
    );
  }

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
      <div className={styles.letter_wrapper}>
        {userLetterList.map((letter) => (
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
      </div>
    </>
  );
};

export default LetterWrapper;
