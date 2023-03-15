import styles from './SignUpFooter.module.scss';
import { Link } from 'react-router-dom';

export default function SignUpFooter({
  isText,
  linkText,
  link,
}: {
  isText: string;
  linkText: string;
  link: string;
}) {
  return (
    <div className={styles.signup_footer}>
      <p>{isText}</p>
      <Link to={link}>{linkText}</Link>
    </div>
  );
}
