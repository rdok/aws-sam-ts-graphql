import { company, datatype } from "faker";
import { LaunchTransformer } from "../launch-transformer";

it("transforms a launch", () => {
  const { launchTransformer, launch } = makeLaunchTransformer();
  const actual = launchTransformer.transform(launch);
  expect(actual).toStrictEqual({
    id: launch.id,
    name: launch.name,
  });
});

it("transforms a list of launches", () => {
  const { launchTransformer, launches } =
    makeLaunchTransformerWithMockedTransformFunc();
  launchTransformer.transformMany(launches);
  expect(launchTransformer.transform).toHaveBeenCalledTimes(launches.length);
});

it("returns the list of transformed launches", () => {
  const { launchTransformer, launches, mockedTransformValue } =
    makeLaunchTransformerWithMockedTransformFunc();
  const actual = launchTransformer.transformMany(launches);
  expect(actual).toEqual([mockedTransformValue, mockedTransformValue]);
});

function makeLaunchTransformer() {
  const launchTransformer = new LaunchTransformer();
  const launch = makeLaunch();
  const launches = [launch, makeLaunch()];
  return { launchTransformer, launch, launches };
}

function makeLaunchTransformerWithMockedTransformFunc() {
  const launchTransformerMaker = makeLaunchTransformer();
  const mockedTransformValue = "mock-transform-value";
  launchTransformerMaker.launchTransformer.transform = jest
    .fn()
    .mockReturnValue(mockedTransformValue);
  return { ...launchTransformerMaker, mockedTransformValue };
}

function makeLaunch() {
  return {
    id: datatype.uuid(),
    name: company.companyName(),
  };
}
