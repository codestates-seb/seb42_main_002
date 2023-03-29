import classNames from 'classnames';
import { ReactComponent as OwlHome } from '../../../assets/img/common/owls_logo_w.svg';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={classNames(styles.container, 'inner_container')}>
        <div className={styles.footer_logo}>
          <OwlHome />
          <h2>Owls Letters</h2>
        </div>
        <div className={styles.copy}>
          <p>TEAM. 마음은 편지를 타고...💌</p>
          <p>FE. 안아영 김보라 한승완 / BE. 구민주 오예진 이근휘 지소연</p>
          <p>© 2023 Owls Letters All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
