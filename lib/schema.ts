import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
  type Query {
    healthCheck: String
    launch(id: ID!): Launch
    launches(
      """
      The number of results to show.
      """
      limit: Int
      """
      The page number to render.
      """
      page: Int
    ): Launches!
  }

  type Launch {
    id: ID!
    name: String!
  }

  type Launches {
    limit: Int!
    page: Int!
    data: [Launch]!
  }
`;
