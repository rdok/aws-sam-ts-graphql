export type Launch = {
  id: string;
  name: string;
};

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
