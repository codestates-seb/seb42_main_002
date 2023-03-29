import classNames from 'classnames';
import { ReactComponent as OwlHead } from '../../assets/img/intro/owls_cry_head.svg';
import { ReactComponent as OwlBody } from '../../assets/img/intro/owls_body.svg';
import { ReactComponent as OwlWingLeft } from '../../assets/img/intro/owls_wing_left.svg';
import { ReactComponent as OwlWingRight } from '../../assets/img/intro/owls_wing_right.svg';
import styles from './ErrorBoundaryFallback.module.scss';
import Flex from '../Common/Flex/Flex';

const ErrorBoundaryFallback = () => {
  return (
    <div className={styles.intro_container}>
      <div className={styles.intro_title}>
        <p></p>
        <p>에러가 발생했습니다. 새로고침을 해주세요!</p>
      </div>
      <div className={styles.intro_main}>
        <div className={styles.owls_character}>
          <div className={styles.speech_bubble}>
            <div className={styles.speech_bubble_text}>
              <p>에러가</p>
              <p>발생했어요!</p>
            </div>
          </div>
          <div className={styles.owls_body}>
            <div className={styles.owls_head}>
              <OwlHead />
            </div>
            <OwlBody />
            <div
              className={classNames(styles.owls_wing, styles.owls_wing_left)}
            >
              <OwlWingLeft />
            </div>
            <div
              className={classNames(styles.owls_wing, styles.owls_wing_right)}
            >
              <OwlWingRight />
            </div>
          </div>
        </div>
        <h1 className={styles.owls_title_text}>ERROR 404</h1>
      </div>
      <div className={styles.btn_wrapper}>
        <Flex dir="column" gap="md">
          <Flex.Col></Flex.Col>
          <Flex.Col></Flex.Col>
        </Flex>
      </div>
    </div>
  );
};
export default ErrorBoundaryFallback;
