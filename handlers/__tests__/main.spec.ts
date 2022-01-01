import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
} from "aws-lambda/trigger/api-gateway-proxy";
import { createMock } from "ts-auto-mock";
import { Context } from "aws-lambda";

it("checks health status", async () => {
  const response = await makeHandlerForHealthCheck();

  expect(response).toMatchObject({
    body: '{"data":{"healthCheck":"alive"}}\n',
    statusCode: 200,
  });
});

async function makeHandlerForHealthCheck(): Promise<any> {
  const { default: handler } = await import("../main");
  const event = createMock<APIGatewayProxyEvent>({
    httpMethod: "POST",
    path: "/",
    multiValueHeaders: { "content-type": ["application/json"] },
    body: '{"query":"query { healthCheck }"}',
  });
  const context = createMock<Context>();
  const callback = createMock<APIGatewayProxyCallback>();
  return handler(event, context, callback);
}
