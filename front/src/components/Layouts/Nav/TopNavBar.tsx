import classNames from 'classnames';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { FiMail, FiUsers } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import styles from './TopNavBar.module.scss';

const navArr = [
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

const TopNavBar = () => {
  return (
    <nav className={styles.top_nav_bar}>
      {navArr.map((nav, index) => (
        <NavLink
          key={index}
          to={nav.path}
          className={({ isActive }) =>
            isActive
              ? classNames(styles.nav_item, styles.is_active)
              : styles.nav_item
          }
        >
          <span className="blind">{nav.icons}</span>
          <span>{nav.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default TopNavBar;
