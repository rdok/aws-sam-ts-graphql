import { Context } from "../data-sources";

const Query = {
  launch: async (parent: unknown, args: { id: string }, context: Context) => {
    const launchApi = context.dataSources.launchApi;
    const launch = await launchApi.find({ id: args.id });
    return context.ioc.launchTransformer.transform(launch);
  },
  healthCheck: () => "alive",
};

export { Query as default };
