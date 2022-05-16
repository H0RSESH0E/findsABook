const { gql } = require('apollo-server-express');

// createUser,
// getSingleUser,
// saveBook,
// deleteBook,
// login,

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
}


type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type Auth {
    token: ID!
    user: User
  }
  
type Query {
    me: User
   
}

input BookDataContent{
  authors: [String]
  description: String
  title: String
  bookId: String
  image: String
}

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookDataContent!): User
    deleteBook(bookId: ID!): User
  }

`;
module.exports = typeDefs;