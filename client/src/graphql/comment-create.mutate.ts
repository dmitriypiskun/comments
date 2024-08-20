import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT } from "./comment.fragment";

export const CREATE_COMMENT = gql`
  mutation createComment($data: CreateCommentDto!) {
    createComment(data: $data) {
      ...CommentFragment
    }
  }

  ${COMMENT_FRAGMENT}
`;
