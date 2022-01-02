global.console = {
  ...global.console,
  log: jest.fn(),
};

beforeEach(() => {
  process.env.ENV_EXAMPLE = "mocked_env_example";
});

afterEach(() => {
  // To mock modules from reusable make functions.
  // Achieves cleaner and easier to read unit tests.
  jest.resetModules();
});
