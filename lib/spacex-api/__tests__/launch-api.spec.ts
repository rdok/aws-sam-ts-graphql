describe("Query", () => {
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
    expect(post).toHaveBeenCalledWith(expect.anything(), {
      options: { page: 2, limit: 3 },
    });
  });
});

describe("Find a launch", () => {
  it("returns the launch response", async () => {
    const { launchApi, mockedResponse } = await makeLaunchApi();
    const launch = await launchApi.find({ id: "any" });
    expect(launch).toEqual(mockedResponse);
  });

  it("uses the correct GET path for finding a launch", async () => {
    const { launchApi, get } = await makeLaunchApi();
    await launchApi.find({ id: "lorem" });
    expect(get).toHaveBeenCalledWith(`launches/lorem`);
  });
});

async function makeLaunchApi() {
  const { LaunchApi } = await import("../launch-api");
  const mockedResponse = { lorem: "ipsum" };
  const post = jest.fn().mockResolvedValueOnce(mockedResponse);
  const get = jest.fn().mockResolvedValueOnce(mockedResponse);
  jest.mock("apollo-datasource-rest", () => ({
    RESTDataSource: class {
      post = post;
      get = get;
    },
  }));

  const launchApi = new LaunchApi();
  return { launchApi, mockedResponse, post, get };
}
