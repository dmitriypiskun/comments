import React from "react";
import styles from "./avatar.module.css";

export interface AvatarProps {
  src: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <img src={src} alt="Avatar" className={styles["avatar"]}></img>;
};
