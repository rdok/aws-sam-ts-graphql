import { LaunchTransformer } from "../launch-transformer";

it("transforms a launch", () => {
  const { launchTransformer, launch } = makeTransformer();
  const actual = launchTransformer.transform(launch);
  expect(actual).toStrictEqual({ id: launch.id, name: launch.name });
});

it("transforms a list of launches", () => {
  const { launchTransformer, launches } = makeMockedTransformer();
  launchTransformer.transformMany(launches);
  expect(launchTransformer.transform).toHaveBeenCalledTimes(
    launches.docs.length
  );
});

it("returns the list of transformed launches", () => {
  const { launchTransformer, launches, mockedTransformValue } =
    makeMockedTransformer();
  const actual = launchTransformer.transformMany(launches);
  expect(actual).toEqual([mockedTransformValue, mockedTransformValue]);
});

function makeTransformer() {
  const launchTransformer = new LaunchTransformer();
  const launch = makeLaunch();
  const launches = { docs: [launch, makeLaunch()] };
  return { launchTransformer, launch, launches };
}

function makeMockedTransformer() {
  const launchTransformerMaker = makeTransformer();
  const mockedTransformValue = "mock-transform-value";
  launchTransformerMaker.launchTransformer.transform = jest
    .fn()
    .mockReturnValue(mockedTransformValue);
  return { ...launchTransformerMaker, mockedTransformValue };
}

function makeLaunch() {
  return {
    id: `5eb87cd9ffd86e000604b32a${new Date()}`,
    name: `FalconSat ${new Date()}`,
  };
}
