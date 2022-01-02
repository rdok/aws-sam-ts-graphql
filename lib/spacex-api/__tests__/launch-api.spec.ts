it("returns the launch query response", async () => {
  const { launchApi, mockedResponse } = await makeLaunchApi();
  await expect(launchApi.query()).resolves.toStrictEqual(mockedResponse);
});

it("uses the correct launch path", async () => {
  const { launchApi, post } = await makeLaunchApi();
  await launchApi.query();
  expect(post).toHaveBeenCalledWith("launches/query", expect.anything());
});

it("paginates and limits results", async () => {
  const { launchApi, post } = await makeLaunchApi();
  await launchApi.query({ page: 2, limit: 3 });
  expect(post).toHaveBeenCalledWith(expect.anything(), { page: 2, limit: 3 });
});

async function makeLaunchApi() {
  const { LaunchApi } = await import("../launch-api");
  const mockedResponse = { lorem: "ipsum" };
  const post = jest.fn().mockResolvedValueOnce(mockedResponse);
  jest.mock("apollo-datasource-rest", () => ({
    RESTDataSource: class {
      post = post;
    },
  }));

  const launchApi = new LaunchApi();
  return { launchApi, mockedResponse, post };
}
