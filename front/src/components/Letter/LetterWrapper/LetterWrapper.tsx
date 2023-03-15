import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedUserInfo } from '../../../recoil/atoms';
import { useNavigate } from 'react-router-dom';

import Letter from '../Letter/Letter';
import LetterUserCard from '../LetterUserCard/LetterUserCard';

import { lettersData } from '../../../dummy/letter';
import styles from './LetterWrapper.module.scss';

const LetterWrapper = () => {
  const navigate = useNavigate();
  const selectedUser = useRecoilValue(selectedUserInfo);

  useEffect(() => {
    // 리다이렉트
    if (selectedUser.name === '') {
      navigate('/');
    }
  }, []);

  return (
    <>
      <LetterUserCard
        birthday={selectedUser.birthday}
        location={selectedUser.location}
        name={selectedUser.name}
        profile={selectedUser.profile}
      />
      <div className={styles.letter_wrapper}>
        {lettersData.map((letter) => (
          <Letter
            sender={letter.sender.name}
            receiver={letter.receiver.name}
            body={letter.body}
            createdAt={letter.createdAt}
            canRead={letter.canRead}
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
