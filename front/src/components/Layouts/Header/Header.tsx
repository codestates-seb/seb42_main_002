import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ReactComponent as OwlsLogo } from '../../../assets/img/intro/owls_head.svg';
import TopNavBar from '../Nav/TopNavBar';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={classNames(styles.container, 'inner_container')}>
        <Link to="/main" className={styles.header_logo}>
          <OwlsLogo />
          <h1>Owls Letters</h1>
        </Link>
        <TopNavBar />
      </div>
    </div>
  );
};

export default Header;
