import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
  type Query {
    healthCheck: String
    launch(id: ID!): Launch
  }

  type Launch {
    id: ID!
    name: String!
  }
`;
