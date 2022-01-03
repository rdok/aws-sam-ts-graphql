import { ApolloServer } from "apollo-server";
import { typeDefs } from "../lib/schema";
import { resolvers } from "../lib/resolvers";
import { dataSources } from "../lib/context";
import * as ioc from "../lib/ioc";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: () => ({ ioc }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
