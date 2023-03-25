import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { selectedUserInfoState } from '../../../recoil/atoms';
import { letterPagiNationState } from '../../../recoil/atoms/pagination';
import { letterListSeletor } from '../../../recoil/selectors/letter';
import Empty from '../../Common/Empty/Empty';
import LastInfinite from '../../Common/LastInfinite/LastInfinite';
import Letter from '../Letter/Letter';

type NextLetterListProps = {
  endText?: string;
  addRecentData: any;
  empty: {
    title: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
  };
};

type DataType = {
  content: any[];
  isStop: boolean;
};

// 무한스크롤을 위한 유저 카드 리스트
const NextLetterList = ({
  endText,
  addRecentData,
  empty,
}: NextLetterListProps) => {
  const data: DataType = useRecoilValue(letterListSeletor);
  const selectedUser = useRecoilValue(selectedUserInfoState);
  const [pagination, setPagination] = useRecoilState(letterPagiNationState);

  const sentinelRef = useInfiniteScroll(async () => {
    if (data.isStop) {
      return;
    }
    setPagination((prev) => prev + 1);
    addRecentData(data);
  }, pagination);

  useEffect(() => {
    return () => {
      setPagination(0);
    };
  }, []);

  if (data.content.length === 0) {
    return (
      <>
        <Empty title={empty.title}>
          {empty.icon}
          {empty.children}
        </Empty>
      </>
    );
  }

  return (
    <>
      {data.content.map((letter) => (
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
          memberStatus={selectedUser.memberStatus}
        />
      ))}
      <LastInfinite text={endText} ref={sentinelRef} />
    </>
  );
};

export default NextLetterList;
