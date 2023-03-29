import classNames from 'classnames';
import React from 'react';
import { DefaultProps } from '../../../utils';
import styles from './InfoGroup.module.scss';

const InfoGroupContent = ({ children, className }: DefaultProps) => {
  return (
    <div
      className={classNames(styles.info_content, styles[className as string])}
    >
      {children}
    </div>
  );
};

const InfoGroupLabel = ({ children, className }: DefaultProps) => {
  return (
    <div className={classNames(styles.info_label, styles[className as string])}>
      {children}
    </div>
  );
};

const InfoGroupWrapper = ({ children, className }: DefaultProps) => {
  return (
    <div className={classNames(styles.info_group, styles[className as string])}>
      {children}
    </div>
  );
};

const InfoGroup = Object.assign(InfoGroupWrapper, {
  Label: InfoGroupLabel,
  Content: InfoGroupContent,
});

export default InfoGroup;
