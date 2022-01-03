import { LaunchApi } from "./spacex-api/launch-api";

export type DataSources = {
  launchApi: LaunchApi;
};

export const dataSources = (): DataSources => ({
  launchApi: new LaunchApi(),
});
