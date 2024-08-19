import { PropsWithChildren } from "react";
import styles from "./modal.module.css";
import { CloseOutlined } from "@ant-design/icons";

export interface ModalProps {
  title: string;
  onClose: () => void;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  title,
  children,
  onClose,
}) => {
  return (
    <>
      <div className={styles["wrapper-container"]} onClick={onClose}></div>
      <div className={styles["container"]}>
        <div className={styles["modal"]}>
          <div className={styles["modal-header"]}>
            <strong>{title}</strong>
            <CloseOutlined onClick={onClose} />
          </div>

          <div className={styles["modal-content"]}>{children}</div>
        </div>
      </div>
    </>
  );
};
