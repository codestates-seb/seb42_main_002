import styles from './MainTitle.module.scss';

type MainTitleProps = {
  title: string;
};

const MainTitle = ({ title }: MainTitleProps) => {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
    </div>
  );
};

export default MainTitle;
