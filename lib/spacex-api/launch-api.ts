import { SpacexApi } from "./spacex-api";

type Props = {
  page?: number;
  limit?: number;
};

export class LaunchApi extends SpacexApi {
  async query(props: Props = {}) {
    return this.post("launches/query", props);
  }
}
