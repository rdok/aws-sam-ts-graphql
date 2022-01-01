import { ApolloServer, gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    healthCheck: String
  }
`;

const resolvers = { Query: { healthCheck: () => "alive" } };

const server = new ApolloServer({ typeDefs, resolvers });

const GraphqlHandler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "https://studio.apollographql.com",
      credentials: true,
      allowedHeaders: ["content-type"],
      methods: ["GET", "OPTIONS", "POST"],
    },
  },
});

export default GraphqlHandler;
