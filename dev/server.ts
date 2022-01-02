import { ApolloServer } from "apollo-server";
import { ApolloConfig } from "../lib/apollo-config";

const server = new ApolloServer(ApolloConfig);

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
