import styles from './InputFeild.module.scss';

type InputFeildProps = {
  id: string;
  name: string;
  type: string;
  value?: string;
  pattern?: string;
  placeholder?: string;
  disabled?: boolean;
};

const InputFeild = ({
  id,
  name,
  type = 'text',
  value,
  placeholder,
  pattern,
  disabled,
}: InputFeildProps) => {
  return (
    <div className={styles.inputFeild}>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        pattern={pattern}
        disabled={disabled}
      />
    </div>
  );
};

export default InputFeild;
