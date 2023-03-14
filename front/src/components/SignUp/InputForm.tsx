import styles from './SignUp.module.scss';

export default function InputForm({
  children,
  htmlfor,
  labelInner,
  placeholder,
  name,
  isError,
  errorText,
  validation,
}: {
  children: JSX.Element;
  htmlfor: string;
  labelInner: string;
  placeholder?: string;
  name?: string;
  isError?: boolean;
  errorText?: string;
  validation?: any;
}) {
  const onBlurHandler = (e: any) => {
    if (name === 'email') {
      validation(e.target.value);
    } else if (name === 'name') {
      validation(undefined, e.target.value);
    } else if (name === 'birthday') {
      validation(undefined, undefined, e.target.value);
    } else if (name === 'password') {
      validation(undefined, undefined, undefined, e.target.value);
    } else if (name === 'passwordCheck') {
      validation(undefined, undefined, undefined, undefined, e.target.value);
    }
  };
  // console.log(isError);

  return (
    <div className={styles.input_container}>
      <label
        htmlFor={htmlfor}
        className={
          isError ? styles.inputform_error_lable : styles.inputform_lable
        }
      >
        {labelInner}
      </label>
      <input
        onBlur={onBlurHandler}
        type={htmlfor}
        id={htmlfor}
        placeholder={placeholder}
        name={name}
        className={
          isError ? styles.inputform_error_input : styles.inputform_input
        }
      />
      {isError ? <p className={styles.error_text}>{errorText}</p> : null}
      {children}
    </div>
  );
}
