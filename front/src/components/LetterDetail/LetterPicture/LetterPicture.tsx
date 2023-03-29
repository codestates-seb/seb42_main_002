import classNames from 'classnames';
import { ReactComponent as Camera } from '../../../assets/img/camera.svg';
import { onErrorImageHandler } from '../../../utils';

import styles from './LetterPicture.module.scss';

type LetterPictureProps = {
  pic: string;
  rotate: number;
  onClick?: (pic: string) => void;
  onAdd?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAdd?: boolean;
};

const LetterPicture = ({
  pic,
  rotate,
  onClick,
  onAdd,
  isAdd,
}: LetterPictureProps) => {
  const classNameValues = classNames(
    styles.picture,
    { [styles.odd]: rotate % 2 === 1 },
    { [styles.even]: rotate % 2 === 0 }
  );

  if (isAdd) {
    return (
      <label htmlFor="pic_file" className={classNameValues}>
        <input
          type={'file'}
          id="pic_file"
          name="add_pic"
          className="blind"
          onChange={onAdd}
        />
        <div className={styles.camera}>
          <Camera />
        </div>
      </label>
    );
  }

  return (
    <div
      className={classNameValues}
      role="presentation"
      onClick={onClick && onClick.bind(null, pic)}
    >
      <img src={pic} alt="첨부 이미지" onError={onErrorImageHandler} />
    </div>
  );
};

export default LetterPicture;
