import { ApolloServer } from "apollo-server-lambda";
import { typeDefs } from "../lib/schema";
import { resolvers } from "../lib/resolvers";
import { dataSources } from "../lib/data-sources";

const graphql = new ApolloServer({ typeDefs, resolvers, dataSources });

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
