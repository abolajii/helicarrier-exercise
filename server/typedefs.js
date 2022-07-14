const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    gender: String
    status: String
    email: String
    img: String
    created_at: String
  }
  type Query {
    getAllUsers: [User]
    getAllUser(name: String!): [User]
    getFilterResults(status: String, gender: String): [User]
  }
`;

module.exports = { typeDefs };
