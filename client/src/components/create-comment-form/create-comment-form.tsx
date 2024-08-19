import { useReducer, useState } from "react";
import styles from "./create-comment-form.module.css";
import { Button } from "../button/button";
import { validateEmail } from "../../utils/validation";
import { InputField } from "../input-field/input-field";
import { Textarea } from "../textarea/textarea";
import { Markup } from "interweave";

export interface CommentForm {
  username?: string;
  email?: string;
  text?: string;
  captcha?: string;
  commentId?: string;
}

export interface CommentFormState extends CommentForm {
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
            isValidEmail: validateEmail(action.value),
          };
        case "changeText":
          return { ...state, text: action.value, isValidText: true };
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
        text: data?.text,
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
  onCreate: (data: CommentForm) => Promise<void> | void;
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

  const handleChangeText = (value: string) => {
    dispatch({ type: "changeText", value });
  };

  const handleCreateComment = () => {
    if (!form.isValidUsername || !form.isValidEmail || !form.isValidText) {
      alert("The fields are filled in incorrectly");
      return;
    }

    onCreate(form);
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

      {isPreview ? (
        <div className={styles["preview-container"]}>
          <strong>Preview comment</strong>
          <Markup content={form.text} />
        </div>
      ) : (
        <Textarea
          label="Comment"
          placeholder="Input comment"
          value={form.text}
          isErrored={!form.isValidText}
          onChange={handleChangeText}
        />
      )}

      <div className={styles["action-container"]}>
        <Button
          isDisabled={!form.text}
          title={isPreview ? "Edit" : "Preview"}
          onClick={() => setIsPreview((value) => !value)}
        />

        <div className={styles["actions"]}>
          <Button title="Create" onClick={handleCreateComment} />
          <Button title="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};
