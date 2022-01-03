import { ApolloServer } from "apollo-server";
import { typeDefs } from "../lib/schema";
import { resolvers } from "../lib/resolvers";
import { dataSources } from "../lib/data-sources";

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
