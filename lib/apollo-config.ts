import { gql } from "apollo-server-lambda";
import { Config } from "apollo-server-core/src/types";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin234",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    healthCheck: () => "alive",
  },
};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. For example
  # the "healthCheck" query returns a string implying the server is up and running
  type Query {
    books: [Book]
    healthCheck: String
  }
`;

export const ApolloConfig: Config = {
  typeDefs,
  resolvers,
};
