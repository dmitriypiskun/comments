import styles from "./button.module.css";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface ButtonProps {
  title: string;
  isDisabled?: boolean;
  onClick: () => void;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  title,
  isDisabled,
  onClick,
  children,
}) => {
  const classes = classNames({
    [`${styles["container"]}`]: true,
    [`${styles["container-primary"]}`]: true,
  });

  return (
    <button disabled={isDisabled} className={classes} onClick={onClick}>
      {title}
      {children}
    </button>
  );
};
