import { HTMLInputTypeAttribute } from "react";
import styles from "./input-field.module.css";
import classNames from "classnames";

export interface InputFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  isErrored?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value = "",
  placeholder,
  type = "text",
  isErrored,
  onChange,
}) => {
  const classes = classNames({
    [`${styles["input"]}`]: true,
    [`${styles["input-error"]}`]: isErrored,
  });

  return (
    <div className={styles["container"]}>
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={classes}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
