import classNames from 'classnames';
import styles from './LetterPicture.module.scss';

type LetterPictureProps = {
  pic: string;
  rotate: number;
};

const LetterPicture = ({ pic, rotate }: LetterPictureProps) => {
  const classNameValues = classNames(
    styles.picture,
    { [styles.odd]: rotate % 2 === 1 },
    { [styles.even]: rotate % 2 === 0 }
  );

  return (
    <div className={classNameValues}>
      <img src={pic} alt="첨부 이미지" />
    </div>
  );
};

export default LetterPicture;
