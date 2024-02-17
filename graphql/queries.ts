import { gql } from "@apollo/client";

export const GET_NOVELS = gql`
  query Novels {
    novels {
      id
      title
      image
      createdAt
      updatedAt
      authors {
        name
        novelId
        id
      }
    }
  }
`;
