import {createContext, useContext, useMemo} from 'react';
import classNames from 'classnames';
import {DefaultProps} from '../../../utils';
import styles from './RadioGroup.module.scss';

type ColsProps = DefaultProps & {
  cols?: number;
  sm?: number;
  md?: number;
  lg?: number;
};

type RadioButtonContextProps = DefaultProps & {
  value: string | null;
  name: string | null;
  onChange: (value: string) => void;
  isSet?: boolean;
};

type RadioButtonProps = DefaultProps &
  ColsProps & {
    id: string;
    name?: string;
    value?: string;
    disabled?: boolean;
    icon?: JSX.Element;
  };

const RadioContext = createContext<any>({
  disabled: false,
  value: '',
  name: '',
  onChange: () => undefined,
});

const RadioButton = ({
  id,
  name,
  value,
  disabled,
  children,
  className,
  icon,
  cols,
}: RadioButtonProps) => {
  const group = useContext(RadioContext);

  const {
    disabled: groupDisabled,
    value: groupValue,
    name: groupName,
    onChange: groupOnChange,
  } = group;

  return (
    <div
      className={classNames(styles.radio_button, styles[className as string])}
    >
      <input
        id={id}
        type="radio"
        value={value}
        name={groupName ?? name}
        disabled={groupDisabled ?? disabled}
        checked={value === (groupValue ?? value)}
        onChange={(e) => groupOnChange(e.target.value)}
      />
      <label htmlFor={id}>
        {icon}
        {children}
      </label>
    </div>
  );
};

const RadioGroupWrapper = ({
  name,
  value,
  onChange,
  children,
  className,
  isSet,
}: RadioButtonContextProps) => {
  const memoziedValue = useMemo(
    () => ({ name, value, onChange }),
    [name, value, onChange]
  );

  return (
    <div
      className={classNames(
        styles.radio_group,
        { [styles.isSet]: isSet },
        styles[className as string]
      )}
    >
      <RadioContext.Provider value={memoziedValue}>
        {children}
      </RadioContext.Provider>
    </div>
  );
};

const RadioGroup = Object.assign(RadioGroupWrapper, {
  Item: RadioButton,
});

export default RadioGroup;
