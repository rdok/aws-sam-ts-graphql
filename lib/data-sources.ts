import { LaunchApi } from "./spacex-api/launch-api";
import * as ioc from "../lib/ioc";

export type Context = {
  dataSources: DataSources;
  ioc: typeof ioc;
};

export type DataSources = {
  launchApi: LaunchApi;
};

export const dataSources = (): DataSources => ({
  launchApi: new LaunchApi(),
});
