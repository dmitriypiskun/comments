import { useReducer, useState } from "react";
import styles from "./create-comment-form.module.css";
import { Button } from "../button/button";
import { InputField } from "../input-field/input-field";
import { Textarea } from "../textarea/textarea";
import { Markup } from "interweave";
import { CreateCommentData } from "../../comment.datasource";
import validator from "validator";
import { validateText } from "../../utils/validate";
import {
  BoldOutlined,
  BorderlessTableOutlined,
  EditOutlined,
  EyeOutlined,
  ItalicOutlined,
  LinkOutlined,
} from "@ant-design/icons";

export interface CommentFormState {
  username?: string;
  email?: string;
  text?: string;
  captcha?: string;
  commentId?: string;
  isValidEmail?: boolean;
  isValidUsername?: boolean;
  isValidText?: boolean;
}

interface ChangeUsername {
  type: "changeUsername";
  value: string;
}
interface ChangeEmail {
  type: "changeEmail";
  value: string;
}
interface ChangeText {
  type: "changeText";
  value: string;
}
interface ChangeCaptcha {
  type: "changeCaptcha";
  value: string;
}

type CommentFormAction =
  | ChangeUsername
  | ChangeEmail
  | ChangeText
  | ChangeCaptcha;

const useCommentFormReducer = (initState?: CommentFormState) =>
  useReducer(
    (state: CommentFormState, action: CommentFormAction): CommentFormState => {
      switch (action.type) {
        case "changeUsername":
          return {
            ...state,
            username: action.value,
            isValidUsername: !!action.value,
          };
        case "changeEmail":
          return {
            ...state,
            email: action.value,
            isValidEmail: validator.isEmail(action.value),
          };
        case "changeText":
          return {
            ...state,
            text: action.value,
            isValidText: validateText(action.value),
          };
        case "changeCaptcha":
          return { ...state, captcha: action.value };
        default:
          return state;
      }
    },
    initState,
    (data?: CommentFormState) =>
      ({
        username: data?.username,
        email: data?.email,
        text: data?.text || "",
        captcha: data?.captcha,
        commentId: data?.commentId,
        isValidEmail: data?.isValidEmail || true,
        isValidUsername: data?.isValidUsername || true,
        isValidText: data?.isValidText || true,
      } as CommentFormState)
  );

export interface CreateCommentFormProps {
  username?: string;
  email?: string;
  commentId?: string;
  onCreate: (data: CreateCommentData) => Promise<void> | void;
  onClose: () => Promise<void> | void;
}

export const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  username,
  email,
  commentId,
  onClose,
  onCreate,
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [form, dispatch] = useCommentFormReducer({
    username,
    email,
    commentId,
  });

  const handleCreateComment = () => {
    if (
      !(
        form.email &&
        form.isValidEmail &&
        form.username &&
        form.isValidUsername &&
        form.text &&
        form.isValidText
      )
    ) {
      alert("The fields are filled in incorrectly");
      return;
    }

    onCreate({
      email: form.email,
      username: form.username,
      text: form.text,
      commentId: form.commentId,
      captcha: form.captcha,
    });
  };

  return (
    <div className={styles["container"]}>
      <InputField
        label="User name"
        placeholder="Input username"
        value={form.username}
        isErrored={!form.isValidUsername}
        onChange={(value) => dispatch({ type: "changeUsername", value })}
      />

      <InputField
        label="Email"
        type="email"
        placeholder="Input email"
        value={form.email}
        isErrored={!form.isValidEmail}
        onChange={(value) => dispatch({ type: "changeEmail", value })}
      />

      <div className={styles["wrapper-textarea"]}>
        <div className={styles["textarea-action"]}>
          {!isPreview && (
            <div className={styles["tags-container"]}>
              <BoldOutlined
                className={styles["icon-button"]}
                onClick={() =>
                  dispatch({
                    type: "changeText",
                    value: form.text + "<strong></strong>",
                  })
                }
              />
              <ItalicOutlined
                className={styles["icon-button"]}
                onClick={() =>
                  dispatch({
                    type: "changeText",
                    value: form.text + "<i></i>",
                  })
                }
              />
              <BorderlessTableOutlined
                className={styles["icon-button"]}
                onClick={() =>
                  dispatch({
                    type: "changeText",
                    value: form.text + "<code></code>",
                  })
                }
              />
              <LinkOutlined
                className={styles["icon-button"]}
                onClick={() =>
                  dispatch({
                    type: "changeText",
                    value: form.text + "<a href=”” title=””></a>",
                  })
                }
              />
            </div>
          )}

          <div className={styles["wrapper-preview"]}>
            {isPreview ? (
              <EditOutlined
                className={styles["icon-button"]}
                onClick={() => setIsPreview((value) => !value)}
              />
            ) : (
              form.text && (
                <EyeOutlined
                  className={styles["icon-button"]}
                  onClick={() => setIsPreview((value) => !value)}
                />
              )
            )}
          </div>
        </div>

        {isPreview ? (
          <div className={styles["preview-container"]}>
            <Markup content={form.text} />
          </div>
        ) : (
          <Textarea
            placeholder="Input comment"
            value={form.text}
            isErrored={!form.isValidText}
            onChange={(value) => dispatch({ type: "changeText", value })}
          />
        )}
      </div>

      <div className={styles["action-container"]}>
        <Button title="Create" onClick={handleCreateComment} />
        <Button title="Close" onClick={onClose} />
      </div>
    </div>
  );
};
