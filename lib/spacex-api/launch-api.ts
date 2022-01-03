import { SpaceXApi } from "./spacex-api";
import { Launch, Launches } from "./types";

export type PaginationProps = {
  page?: number;
  limit?: number;
};

export class LaunchApi extends SpaceXApi {
  async query(props: PaginationProps = {}): Promise<Launches> {
    return this.post("launches/query", { options: props });
  }

  async find(props: { id: string }): Promise<Launch> {
    return this.get(`launches/${props.id}`);
  }
}
