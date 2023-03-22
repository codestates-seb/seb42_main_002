import { useCallback, useEffect, useRef, useState } from 'react';
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
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

const LetterWrapper = () => {
  const navigate = useNavigate();
  const selectedUser = useRecoilValue(selectedUserInfoState);
  const setNewLetter = useSetRecoilState(newLetterState);
  const [userLetterList, setUserLetterList] = useState<LetterDataType[]>([]);
  const pageRef = useRef<number>(0);
  const isStopRef = useRef<boolean>(false);

  const getUserLetterList = async (memberId: number, page: number) => {
    if (isStopRef.current) return;
    try {
      // TODO: 페이지네이션 보류
      const { data } = await GET(
        `letters/members/${memberId}?page=${page}&size=10`
      );
      isStopRef.current = data.last;
      setUserLetterList((prev) => [...prev, ...data.content]);
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  const sentinelRef = useInfiniteScroll(async (page: number) => {
    if (!selectedUser.memberId) {
      return;
    }
    await getUserLetterList(selectedUser.memberId, page);
    pageRef.current++;
  }, pageRef.current);

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

  if (userLetterList.length === 0) {
    return (
      <>
        <Empty title="아직 편지가 없어요.">
          <SlEnvolopeLetter className={styles.icon} size={'6rem'} />
        </Empty>
        <div ref={sentinelRef}>마지막</div>
      </>
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
      <div ref={sentinelRef}></div>
    </>
  );
};

export default LetterWrapper;
