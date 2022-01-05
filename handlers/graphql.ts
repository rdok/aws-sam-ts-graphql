import { ApolloServer } from "apollo-server-lambda";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { Request, Response } from "express-serve-static-core";

import { dataSources, ioc, resolvers, typeDefs } from "../lib";

const graphql = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: (props: {
    event: APIGatewayProxyEvent;
    context: Context;
    express: {
      req: Request;
      res: Response;
    };
  }) => {
    const token = props.express.req.headers.authorization;
    console.log(token);
    // const user = getUser(token);
    // we could also check user roles/permissions here
    // if (!user) throw new AuthenticationError("you must be logged in");
    // return { user, ioc };
    return { ioc };
  },
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
