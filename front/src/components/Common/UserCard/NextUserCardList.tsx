import React, { isValidElement, useEffect } from 'react';
import {
  RecoilValueReadOnly,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { pageNationState } from '../../../recoil/atoms/pagination';
import Empty from '../Empty/Empty';
import LastInfinite from '../LastInfinite/LastInfinite';
import UserCard from './UserCard';

type NextUserCardListProps = {
  selector: RecoilValueReadOnly<any>;
  onClick?: any;
  children?: React.ReactNode;
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
const NextUserCardList = ({
  selector,
  onClick,
  children,
  endText,
  addRecentData,
  empty,
}: NextUserCardListProps) => {
  const data: DataType = useRecoilValue(selector);
  const [pagination, setPagination] = useRecoilState(pageNationState);
  const refresh = useRecoilRefresher_UNSTABLE(selector);

  useEffect(() => {
    refresh();
  }, []);

  const sentinelRef = useInfiniteScroll(async () => {
    if (data.isStop) {
      return;
    }
    setPagination((prev) => prev + 1);
    addRecentData(data);
  }, pagination);

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
      {data.content.map((user: any) => (
        <UserCard
          key={user.memberId}
          memberId={user.memberId}
          name={user.name}
          location={user.location}
          profile={user.profile}
          birthday={user.birthday}
          date={user.birthday}
          onClick={onClick}
          memberStatus={user.memberStatus}
        >
          {/* {children} */}
          {isValidElement(children) &&
            React.cloneElement(children, { ...user })}
        </UserCard>
      ))}
      <LastInfinite text={endText} ref={sentinelRef} />
    </>
  );
};

export default NextUserCardList;
