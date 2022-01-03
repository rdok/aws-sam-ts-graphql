import { Launch, Launches } from "./types";

export class LaunchTransformer {
  transform(launch: Launch) {
    return {
      id: launch.id,
      name: launch.name,
    };
  }

  transformMany(launches: Launches) {
    return launches.docs.map((launch: Launch) => {
      return this.transform(launch);
    });
  }
}
