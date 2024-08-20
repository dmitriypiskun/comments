import styles from "./app.module.css";
import { CommentItem, Comment } from "./components/comment-item/comment-item";
import avatar from "./assets/default_avatar.png";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/button/button";
import { CreateCommentForm } from "./components/create-comment-form/create-comment-form";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal } from "./components/modal/modal";
import {
  CommentData,
  CreateCommentData,
  useCreateComment,
  useGetComments,
} from "./comment.datasource";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [commentId, setCommentId] = useState<string>();

  const { comments, isLoading, error } = useGetComments();
  const { createComment } = useCreateComment();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const data = useMemo(() => {
    const convert = (data: CommentData[]): Comment[] => {
      return data.map(
        (item): Comment => ({
          id: item.id,
          author: item.author.username,
          createDate: new Date(item.createdAt),
          text: item.text,
          comments: item.children?.length ? convert(item.children) : [],
        })
      );
    };

    return comments?.comments ? convert(comments.comments) : [];
  }, [comments]);

  const handleCreateComment = async (data: CreateCommentData) => {
    if (!data.username || !data.email || !data.text) {
      return;
    }

    const result = await createComment({
      username: data.username,
      commentId: data.commentId,
      email: data.email,
      text: data.text,
    });
    console.log("Saved comment: ", result);
    handleCloseModal();
  };

  const handleOpenModal = (id?: string) => {
    if (id) {
      setCommentId(id);
    }

    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCommentId("");
  };

  if (isLoading) {
    return (
      <div className={styles["container"]}>
        <div className={styles["loader-wrapper"]}>
          <LoadingOutlined style={{ height: "48px", width: "48px" }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["container"]}>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return (
    <>
      <div className={styles["container"]}>
        <div>
          <Button title="Add comment" onClick={handleOpenModal}>
            <PlusOutlined />
          </Button>
        </div>

        {data.map((item) => (
          <CommentItem
            key={item.id}
            url={avatar}
            id={item.id}
            author={item.author}
            createDate={item.createDate}
            text={item.text}
            comments={item.comments}
            onOpenCreate={(id) => handleOpenModal(id)}
          />
        ))}
      </div>

      {isOpen && (
        <Modal title="Adding comment" onClose={handleCloseModal}>
          <CreateCommentForm
            commentId={commentId}
            onCreate={handleCreateComment}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
