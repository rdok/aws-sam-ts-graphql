import { SpaceXApi } from "./spacex-api";
import { Launch } from "./types";

type Props = {
  page?: number;
  limit?: number;
};

export class LaunchApi extends SpaceXApi {
  async query(props: Props = {}) {
    return this.post("launches/query", props);
  }

  async find(props: { id: string }): Promise<Launch> {
    return this.get(`launches/${props.id}`);
  }
}
