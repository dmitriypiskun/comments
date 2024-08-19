import classNames from "classnames";
import styles from "./textarea.module.css";
import { useEffect, useRef } from "react";

const useAutosizeTextarea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export interface TextareaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  isErrored?: boolean;
  onChange: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value = "",
  placeholder,
  isErrored,
  onChange,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextarea(textAreaRef.current, value || "");

  const classes = classNames({
    [`${styles["textarea"]}`]: true,
    [`${styles["textarea-error"]}`]: isErrored,
  });

  return (
    <div className={styles["container"]}>
      {label && <label>{label}</label>}
      <textarea
        ref={textAreaRef}
        placeholder={placeholder}
        value={value}
        rows={2}
        className={classes}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
