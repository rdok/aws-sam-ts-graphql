import { DataSources } from "./data-sources";
import * as ioc from "../lib/ioc";

export type Context = {
  dataSources: DataSources;
  ioc: typeof ioc;
};

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

export const resolvers = {
  Query: {
    launch: async (parent: unknown, args: { id: string }, context: Context) => {
      const launchApi = context.dataSources.launchApi;
      const launch = await launchApi.find({ id: args.id });
      return context.ioc.launchTransformer.transform(launch);
    },
    books: () => books,
    healthCheck: () => "alive",
  },
};
