import { gql } from "@apollo/client";

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on CommentModel {
    id
    parentId
    authorId
    text
    createdAt
    author {
      id
      username
      email
      createdAt
    }
  }
`;
