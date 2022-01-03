import { resolvers } from "../index";
import { makeContext } from "./makers";

describe("Query.launches", () => {
  it("queries launches with pagination", async () => {
    const { launchesArgs, context, launchApi } = makeContext();
    await resolvers.Query.launches(null, launchesArgs, context);
    expect(launchApi.query).toHaveBeenCalledWith(launchesArgs);
  });

  it("transforms the fetched launches", async () => {
    const { context, launchTransformer, launches } = makeContext();
    await resolvers.Query.launches(null, {}, context);
    expect(launchTransformer.transformMany).toHaveBeenCalledWith(launches);
  });

  it("returns the transformed launches", async () => {
    const { launchesArgs, context, transformedLaunches } = makeContext();
    const response = await resolvers.Query.launches(
      null,
      launchesArgs,
      context
    );
    expect(response).toEqual({ ...launchesArgs, data: transformedLaunches });
  });
});
