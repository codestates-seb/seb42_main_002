import styles from './SignUp.module.scss';

export default function InputForm({
  children,
  htmlfor,
  labelInner,
  placeholder,
}: {
  children: JSX.Element;
  htmlfor: string;
  labelInner: string;
  placeholder?: string;
}) {
  return (
    <div className={styles.input_container}>
      <label htmlFor={htmlfor} className={styles.inputform_lable}>
        {labelInner}
      </label>
      <input
        id={htmlfor}
        placeholder={placeholder}
        className={styles.inputform_input}
      />
      {children}
    </div>
  );
}
