import { useLocation } from 'react-router-dom';
import LetterUserCard from '../LetterUserCard/LetterUserCard';
import styles from './LetterWrapper.module.scss';

const LetterWrapper = () => {
  const { state } = useLocation();

  return (
    <>
      <LetterUserCard {...state} />
    </>
  );
};

export default LetterWrapper;
