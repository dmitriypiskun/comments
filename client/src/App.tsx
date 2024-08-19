import styles from "./app.module.css";
import { CommentItem, Comment } from "./components/comment-item/comment-item";
import { mockData } from "./mock-data";
import avatar from "./assets/default_avatar.png";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/button/button";
import {
  CreateCommentForm,
  CommentFormState,
} from "./components/create-comment-form/create-comment-form";
import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "./components/modal/modal";

interface DataType {
  id: string;
  parentId: string | null;
  authorId: string;
  text: string;
  createdAt: string;
  children?: DataType[];
  author: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [commentId, setCommentId] = useState<string>();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const data = useMemo(() => {
    const convert = (data: DataType[]): Comment[] => {
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

    return convert(mockData);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createComment = (_data: CommentFormState) => {};

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
            onCreate={createComment}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
