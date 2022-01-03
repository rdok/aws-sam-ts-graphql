import { Launch } from "./types";

export class LaunchTransformer {
  transform(launch: Launch) {
    return {
      id: launch.id,
      name: launch.name,
    };
  }

  transformMany(launches: Launch[]) {
    return launches.map((launch: Launch) => {
      return this.transform(launch);
    });
  }
}
