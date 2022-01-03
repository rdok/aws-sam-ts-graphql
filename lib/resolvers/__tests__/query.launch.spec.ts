import { resolvers } from "../index";
import { createMock } from "ts-auto-mock";
import { Launch } from "../../spacex-api/types";
import { LaunchTransformer } from "../../spacex-api/launch-transformer";
import { LaunchApi } from "../../spacex-api/launch-api";
import { Context } from "../../data-sources";

describe("Query.launch", () => {
  it("fetches the requested launch", async () => {
    const { args, context, launchApi } = makeContext();
    await resolvers.Query.launch(null, args, context);
    expect(launchApi.find).toHaveBeenCalledWith(args);
  });

  it("transforms the fetched launch", async () => {
    const { args, context, launchTransformer, launch } = makeContext();
    await resolvers.Query.launch(null, args, context);
    expect(launchTransformer.transform).toHaveBeenCalledWith(launch);
  });

  it("returns the transformed launch", async () => {
    const { args, context, transformedLaunch } = makeContext();
    const response = await resolvers.Query.launch(null, args, context);
    expect(response).toEqual(transformedLaunch);
  });
});

function makeContext() {
  const args = { id: "uuid" };
  const launch = createMock<Launch>();
  const transformedLaunch = jest.fn();
  const launchApi = createMock<LaunchApi>({
    find: jest.fn().mockResolvedValueOnce(launch),
  });
  const launchTransformer = createMock<LaunchTransformer>({
    transform: jest.fn().mockReturnValueOnce(transformedLaunch),
  });
  const context: Context = {
    dataSources: { launchApi },
    ioc: { launchTransformer },
  };
  return {
    launchApi,
    launch,
    context,
    launchTransformer,
    transformedLaunch,
    args,
  };
}
