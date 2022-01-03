import { resolvers } from "../index";
import { makeContext } from "./makers";

describe("Query.launch", () => {
  it("fetches the requested launch", async () => {
    const { launchArgs, context, launchApi } = makeContext();
    await resolvers.Query.launch(null, launchArgs, context);
    expect(launchApi.find).toHaveBeenCalledWith(launchArgs);
  });

  it("transforms the fetched launch", async () => {
    const { launchArgs, context, launchTransformer, launch } = makeContext();
    await resolvers.Query.launch(null, launchArgs, context);
    expect(launchTransformer.transform).toHaveBeenCalledWith(launch);
  });

  it("returns the transformed launches", async () => {
    const { launchArgs, context, transformedLaunch } = makeContext();
    const response = await resolvers.Query.launch(null, launchArgs, context);
    expect(response).toEqual(transformedLaunch);
  });
});
