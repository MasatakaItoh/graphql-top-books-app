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

export const UPDATE_NOVEL = gql`
  mutation UpdateNovel($id: ID!, $data: NovelInput!) {
    updateNovel(id: $id, data: $data) {
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

export const ADD_AUTHOR = gql`
  mutation AddAuthor($novelId: ID!, $name: String!) {
    addAuthor(novelId: $novelId, name: $name) {
      id
      name
      novelId
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      novelId
    }
  }
`;
