import { useNavigate } from 'react-router-dom';
import { ReactComponent as PrevButtonIcon } from '../../../assets/img/prev_button.svg';

const PrevButton = () => {
  const naviagte = useNavigate();

  const onClickHandler = (): void => {
    naviagte(-1);
  };

  return (
    <button onClick={onClickHandler}>
      <PrevButtonIcon />
    </button>
  );
};

export default PrevButton;
