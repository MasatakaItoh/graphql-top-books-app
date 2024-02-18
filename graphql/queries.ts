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

export const GET_NOVEL = gql`
  query Novel($id: ID!) {
    novel(id: $id) {
      id
      title
      image
      createdAt
      updatedAt
      authors {
        id
        name
        novelId
      }
    }
  }
`;
