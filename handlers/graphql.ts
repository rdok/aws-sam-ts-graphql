import { ApolloServer } from "apollo-server-lambda";

import { ApolloConfig } from "../lib/apollo-config";

const graphql = new ApolloServer(ApolloConfig);

const handler = graphql.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "https://studio.apollographql.com",
      credentials: true,
      allowedHeaders: ["content-type"],
      methods: ["GET", "OPTIONS", "POST"],
    },
  },
});

export { handler };
