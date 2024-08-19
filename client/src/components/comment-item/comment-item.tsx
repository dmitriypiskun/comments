import React, { useMemo } from "react";
import { Avatar } from "../avatar/avatar";
import styles from "./comment-item.module.css";
import avatar from "../../assets/default_avatar.png";
import { Markup } from "interweave";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MergeOutlined,
} from "@ant-design/icons";
import classNames from "classnames";

export interface Comment {
  id: string;
  author: string;
  createDate: Date;
  text: string;
  comments?: Comment[];
}

export interface CommentItemProps extends Comment {
  url?: string;
  level?: number;
  onOpenCreate: (id: string) => void;
  onSort?: () => Promise<void> | void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  id,
  author,
  createDate,
  text,
  comments,
  url = avatar,
  level = 0,
  onOpenCreate,
  onSort,
}) => {
  const date = useMemo(
    () =>
      `${createDate.toLocaleDateString()} в ${createDate.toLocaleTimeString(
        "en-GB",
        { hour: "2-digit", minute: "2-digit" }
      )}`,
    [createDate]
  );

  const iconClasses = classNames({
    [`${styles["icon-button"]}`]: true,
    [`${styles["icon-button-primary"]}`]: true,
  });

  return (
    <>
      <div
        className={styles["container"]}
        style={{ marginLeft: `${level * 48}px` }}
      >
        <div className={styles["header"]}>
          <div className={styles["header-title-wrapper"]}>
            <Avatar src={url} />
            <strong>{author}</strong>
            <span>{date}</span>

            <MergeOutlined
              className={iconClasses}
              onClick={() => onOpenCreate(id)}
            />
          </div>

          <div className={styles["header-title-wrapper"]}>
            <ArrowUpOutlined
              className={styles["icon-button"]}
              onClick={() => onSort?.()}
            />

            <strong>{comments?.length || 0}</strong>

            <ArrowDownOutlined
              className={styles["icon-button"]}
              onClick={() => onSort?.()}
            />
          </div>
        </div>

        <div className={styles["body"]}>
          <Markup content={text} />
        </div>
      </div>

      {comments &&
        comments.map((item) => (
          <CommentItem
            key={item.id}
            id={item.id}
            author={item.author}
            createDate={item.createDate}
            text={item.text}
            comments={item.comments}
            level={level + 1}
            onOpenCreate={() => onOpenCreate(item.id)}
          />
        ))}
    </>
  );
};
