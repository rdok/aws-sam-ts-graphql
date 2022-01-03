import { Context } from "../context";
import { PaginationProps } from "../spacex-api/launch-api";

const Query = {
  healthCheck: () => "alive",
  launch: async (parent: any, args: { id: string }, context: Context) => {
    const launchApi = context.dataSources.launchApi;
    const launch = await launchApi.find({ id: args.id });
    return context.ioc.launchTransformer.transform(launch);
  },
  async launches(parent: any, args: PaginationProps, context: Context) {
    const launchApi = context.dataSources.launchApi;
    const launches = await launchApi.query(args);
    return {
      ...args,
      data: context.ioc.launchTransformer.transformMany(launches),
    };
  },
};

export { Query as default };
