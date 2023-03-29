import classNames from 'classnames';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { letterTypeState } from '../../../recoil/atoms';
import { TemplateType } from '../../../utils';
import styles from './LetterType.module.scss';

// TODO : 어떻게 레터 타입을 저장할 것인지
const LetterType = () => {
  const [selectedLetterType, setSelectedLetterType] =
    useRecoilState(letterTypeState);

  const onClickHandler = (typeIndex: number) => {
    setSelectedLetterType(typeIndex);
  };

  return (
    <div className={styles.types}>
      {Object.values(TemplateType).map((type: any, index) => (
        <button
          key={index}
          className={classNames(styles.type, {
            [styles.isActive]: index === selectedLetterType,
          })}
          style={{
            backgroundImage: `url(${type.url})`,
            backgroundColor: type.bgColor,
          }}
          onClick={() => onClickHandler(index)}
        ></button>
      ))}
    </div>
  );
};

export default LetterType;
