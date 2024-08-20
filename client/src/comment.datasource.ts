import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENTS } from "./graphql/comment-list.query";
import { CREATE_COMMENT } from "./graphql/comment-create.mutate";

export interface CommentData {
  id: string;
  parentId: string | null;
  authorId: string;
  text: string;
  createdAt: string;
  children?: CommentData[];
  author: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
}

export interface CommentList {
  comments: CommentData[];
}

export interface CreateCommentData {
  username: string;
  email: string;
  text: string;
  captcha?: string;
  commentId?: string;
}

export const useGetComments = () => {
  const { data, loading, error } = useQuery<CommentList>(GET_COMMENTS);
  return { comments: data, isLoading: loading, error };
};

export const useCreateComment = () => {
  const [create, { data, loading, error }] =
    useMutation<CommentData>(CREATE_COMMENT);

  const createComment = async (data: CreateCommentData) =>
    await create({
      variables: {
        data,
      },
    });

  return { comment: data, isLoading: loading, error, createComment };
};
