import styles from './SignUp.module.scss';

type InputFormType = {
  children: JSX.Element;
  htmlfor: string;
  labelInner: string;
  placeholder?: string;
  name?: string;
  isError?: boolean;
  errorText?: string;
  validation?: any;
  passwordProps?: any;
};

export default function InputForm({
  children,
  htmlfor,
  labelInner,
  placeholder,
  name,
  isError,
  errorText,
  validation,
  passwordProps,
}: InputFormType) {
  const onBlurHandler = (e: any) => {
    if (validation) {
      if (name === 'email') {
        validation(e.target.value);
      } else if (name === 'name') {
        validation(undefined, e.target.value);
      } else if (name === 'birthday') {
        validation(undefined, undefined, undefined, e.target.value);
      } else if (name === 'signup_password') {
        validation(undefined, undefined, undefined, undefined, e.target.value);
      } else if (name === 'passwordCheck') {
        validation(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          e.target.value
        );
      } else if (name === 'loginEmail') {
        validation(e.target.value);
      } else if (name === 'Loginpassword') {
        validation(undefined, e.target.value);
      }
    }
  };

  const onchangeHandler = (e: any) => {
    if (name === 'signup_password') {
      passwordProps(e.target.value);
    }
  };

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
        onChange={onchangeHandler}
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
