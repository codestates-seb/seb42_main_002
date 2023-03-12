import classNames from 'classnames';
import styles from './LetterPicture.module.scss';

type LetterPictureProps = {
  pic: string;
  rotate: number;
  onClick: (pic: string) => void;
};

const LetterPicture = ({ pic, rotate, onClick }: LetterPictureProps) => {
  const classNameValues = classNames(
    styles.picture,
    { [styles.odd]: rotate % 2 === 1 },
    { [styles.even]: rotate % 2 === 0 }
  );

  return (
    <div
      className={classNameValues}
      role="presentation"
      onClick={onClick.bind(null, pic)}
    >
      <img src={pic} alt="첨부 이미지" />
    </div>
  );
};

export default LetterPicture;
