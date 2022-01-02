it("errors having missing NODE_ENV value", async () => {
  delete process.env.NODE_ENV;
  const { classExample } = await makeExampleClass();
  await expect(classExample.functionExample()).rejects.toThrowError(
    "Environment NODE_ENV not set"
  );
});

it("responds with NODE_ENV value", async () => {
  process.env.NODE_ENV = "env-example-value";
  const { classExample } = await makeExampleClass();
  await expect(classExample.functionExample()).resolves.toEqual(
    "env-example-value"
  );
});

async function makeExampleClass() {
  const { ClassExample } = await import("../class-example");
  const classExample = new ClassExample();
  return { classExample };
}
