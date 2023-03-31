import styles from './InputFeild.module.scss';

type InputFeildProps = {
  id: string;
  name: string;
  type: string;
  value?: string;
  pattern?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

const InputFeild = ({
  id,
  name,
  type = 'text',
  value,
  placeholder,
  pattern,
  disabled,
  required,
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
        required={required}
      />
    </div>
  );
};

export default InputFeild;
