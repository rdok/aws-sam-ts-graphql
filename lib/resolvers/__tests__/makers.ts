import { createMock } from "ts-auto-mock";
import { Launch } from "../../spacex-api/types";
import { LaunchApi, PaginationProps } from "../../spacex-api/launch-api";
import { LaunchTransformer } from "../../spacex-api/launch-transformer";
import { Context } from "../../context";

export function makeContext() {
  const launchArgs = { id: "uuid" };
  const launchesArgs: PaginationProps = { page: 3, limit: 3 };
  const launch = createMock<Launch>();
  const launches = { docs: [launch, createMock<Launch>()] };
  const transformedLaunch = jest.fn();
  const transformedLaunches = [jest.fn(), jest.fn()];
  const launchApi = createMock<LaunchApi>({
    find: jest.fn().mockResolvedValueOnce(launch),
    query: jest.fn().mockResolvedValueOnce(launches),
  });
  const launchTransformer = createMock<LaunchTransformer>({
    transform: jest.fn().mockReturnValueOnce(transformedLaunch),
    transformMany: jest.fn().mockReturnValueOnce(transformedLaunches),
  });
  const context: Context = {
    dataSources: { launchApi },
    ioc: { launchTransformer },
  };
  return {
    launchApi,
    launch,
    launches,
    context,
    launchTransformer,
    transformedLaunch,
    transformedLaunches,
    launchArgs,
    launchesArgs,
  };
}
