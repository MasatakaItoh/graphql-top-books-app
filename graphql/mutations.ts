import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
  mutation AddNovel($data: NovelInput!) {
    addNovel(data: $data) {
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

export const DELETE_NOVEL = gql`
  mutation DeleteNovel($id: ID!) {
    deleteNovel(id: $id) {
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
