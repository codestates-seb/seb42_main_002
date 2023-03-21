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
            {followings.map((user: LetterUserData) => (
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
