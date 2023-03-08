import { NavLink } from 'react-router-dom';
import styles from './BottomNavBar.module.scss';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { FiUsers, FiHome, FiMail } from 'react-icons/fi';
import classNames from 'classnames';

const BottomNavArr = [
  {
    path: '/letters',
    icons: <FiMail />,
    label: '편지목록',
  },
  {
    path: '/followings',
    icons: <FiUsers />,
    label: '친구목록',
  },
  {
    path: '/main',
    icons: <FiHome />,
    label: '메인',
  },
  {
    path: '/voca',
    icons: <BsFillJournalBookmarkFill />,
    label: '단어장',
  },
  {
    path: '/my-profile',
    icons: <IoSettingsOutline />,
    label: '프로필',
  },
];

const BottomNav = () => {
  return (
    <nav className={styles.bottom_nav_bar}>
      {BottomNavArr.map((nav, index) => (
        <NavLink
          key={index}
          to={nav.path}
          className={({ isActive }) =>
            isActive
              ? classNames(styles.nav_item, styles.is_active)
              : styles.nav_item
          }
        >
          {nav.icons}
          <span className="blind">{nav.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
