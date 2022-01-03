import { ApolloServer } from "apollo-server-lambda";
import { typeDefs } from "../lib/schema";
import { resolvers } from "../lib/resolvers";
import { dataSources } from "../lib/data-sources";
import * as ioc from "../lib/ioc";

const graphql = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: () => ({ ioc }),
});

export const handler = graphql.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "https://studio.apollographql.com",
      credentials: true,
      allowedHeaders: ["content-type"],
      methods: ["GET", "OPTIONS", "POST"],
    },
  },
});
