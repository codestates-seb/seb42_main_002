import styles from './SignUpFooter.module.scss';

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
      <a href={link}>{linkText}</a>
    </div>
  );
}
