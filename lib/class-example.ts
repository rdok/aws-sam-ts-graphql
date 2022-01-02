export class ClassExample {
  async functionExample(): Promise<string> {
    const response = process.env.NODE_ENV;
    if (response === undefined) throw Error("Environment NODE_ENV not set.");
    return Promise.resolve(response);
  }
}
