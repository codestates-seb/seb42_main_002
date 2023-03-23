import styles from './PageTitle.module.scss';

type PageTitleProps = {
  title?: string;
  translate?: string;
  prevIcon?: JSX.Element;
  nextIcon?: JSX.Element;
};

const PageTitle = ({
  title,
  translate,
  prevIcon,
  nextIcon,
}: PageTitleProps) => {
  return (
    <header className={styles.page_header}>
      <div className={styles.header_button}>{prevIcon}</div>
      <div>
        {title && <h2 className={styles.title}>{title}</h2>}
        {translate && <div className={styles.translate}>{translate}</div>}
      </div>
      <div className={styles.header_button}>{nextIcon}</div>
    </header>
  );
};

export default PageTitle;
