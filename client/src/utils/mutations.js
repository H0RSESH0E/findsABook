import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation Mutation($bookData: BookDataContent!) {
  saveBook(bookData: $bookData) {
    _id
    username
    email
    savedBooks {
      bookId
    }
    bookCount
  }
}
`;

export const DELETE_BOOK = gql`
mutation Mutation($bookId: String!) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
    bookCount
  }
}
  `;

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`