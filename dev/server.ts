import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers, dataSources } from "../lib";
import * as ioc from "../lib/ioc";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: () => ({ ioc }),
});

server.listen(4000, "127.0.0.1").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
