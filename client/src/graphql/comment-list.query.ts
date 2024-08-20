import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT } from "./comment.fragment";

export const GET_COMMENTS = gql`
  query comments {
    comments {
      ...CommentFragment
      children {
        ...CommentFragment
        children {
          ...CommentFragment
          children {
            ...CommentFragment
            children {
              ...CommentFragment
              children {
                ...CommentFragment
                children {
                  ...CommentFragment
                  children {
                    ...CommentFragment
                    children {
                      ...CommentFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  ${COMMENT_FRAGMENT}
`;
