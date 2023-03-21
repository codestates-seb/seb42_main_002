import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterStatusIcon from '../Common/LetterStatusIcon/LetterStatusIcon';
import UserCard from '../Common/UserCard/UserCard';
import { LetterUserData } from '../../utils';
import { userData } from '../../dummy/userList';
import styles from './Following.module.scss';
import { GET } from '../../utils/axios';
import Button from '../Common/Button/Button';
import ButtonGroup from '../Common/Button/ButtonGroup';
import Flex from '../Common/Flex/Flex';
import Empty from '../Common/Empty/Empty';
import { FiUsers } from 'react-icons/fi';

const Following = () => {
  const navigate = useNavigate();
  const [followings, setFollowings] = useState<LetterUserData[]>([]);
  const [page, setPage] = useState<number>(0);

  const moveProfileHandler = (id: number): void => {
    navigate(`/profile/${id}`);
  };

  const getFollowings = async () => {
    try {
      const { data } = await GET(`/follows/following?page=${page}&size=5`);
      if (data) {
        setFollowings(data.content);
        console.log(data.content);
      }
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  useEffect(() => {
    getFollowings();
  }, []);

  if (followings.length === 0) {
    return (
      <Empty title="팔로잉한 친구가 없어요">
        <Flex dir="column" align="center" gap="lg">
          <Flex.Col>
            <FiUsers className={styles.icon} size={'6rem'} />
          </Flex.Col>
          <Flex.Col>
            <ButtonGroup>
              <Button variant="primary" size="md" to="/search">
                친구 찾으러 가기
              </Button>
            </ButtonGroup>
          </Flex.Col>
        </Flex>
      </Empty>
    );
  }

  return (
    <>
      <Flex dir="column" gap="md">
        <Flex.Col>
          <ButtonGroup justify="end">
            <Button variant="secondary" size="sm" to="/blacklist">
              차단 친구 목록
            </Button>
          </ButtonGroup>
        </Flex.Col>
        <Flex.Col>
          <ul className={styles.letter_list}>
            {followings &&
              followings.map((user: LetterUserData) => (
                <UserCard
                  key={user.memberId}
                  {...user}
                  date={user.lastLetter?.createdAt}
                  onClick={moveProfileHandler}
                >
                  {/* UserCard에 사용할 아이콘을 children으로 전달 */}
                  <LetterStatusIcon
                    status={user.lastLetter?.status}
                    isRead={user.lastLetter?.isRead}
                  />
                </UserCard>
              ))}
          </ul>
        </Flex.Col>
      </Flex>
    </>
  );
};

export default Following;
