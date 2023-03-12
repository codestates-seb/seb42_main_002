import { useLocation } from 'react-router-dom';

import Letter from '../Letter/Letter';
import LetterUserCard from '../LetterUserCard/LetterUserCard';

import styles from './LetterWrapper.module.scss';
import { lettersData } from '../../../dummy/letter';

const LetterWrapper = () => {
  const { state } = useLocation();

  return (
    <>
      <LetterUserCard {...state} />
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
