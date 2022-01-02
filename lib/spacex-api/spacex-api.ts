import { RESTDataSource } from "apollo-datasource-rest";

/**
 * https://github.com/r-spacex/SpaceX-API/blob/master/docs/queries.md
 */
export abstract class SpaceXApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v4/";
  }
}
