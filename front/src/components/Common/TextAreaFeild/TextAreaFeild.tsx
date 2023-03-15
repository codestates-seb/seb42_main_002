import {DefaultProps} from '../../../utils';
import styles from './TextAreaFeild.module.scss';

type TextAreaFeildProps = DefaultProps & {
  id: string;
  name: string;
  value?: string;
};

const TextAreaFeild = ({ id, name, value }: TextAreaFeildProps) => {
  return (
    <div className={styles.textarea}>
      <textarea id={id} name={name} defaultValue={value} />
    </div>
  );
};

export default TextAreaFeild;
