import Letter from '../Letter/Letter';
import LetterUserCard from '../LetterUserCard/LetterUserCard';

import { lettersData } from '../../../dummy/letter';

import styles from './LetterWrapper.module.scss';

// TODO : state를 변경해야한다.
const LetterWrapper = () => {
  return (
    <>
      <LetterUserCard
        birthday="1994-12-22"
        location="KR"
        name="안아영"
        profile={null}
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
