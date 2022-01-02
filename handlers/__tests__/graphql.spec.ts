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
  const { handler } = await import("../graphql");
  const event = createMock<APIGatewayProxyEvent>({
    isBase64Encoded: false,
    httpMethod: "POST",
    path: "/",
    multiValueHeaders: { "Content-Type": ["application/json"] },
    body: JSON.stringify({ query: "{ healthCheck }" }),
  });
  const context = createMock<Context>();
  const callback = createMock<APIGatewayProxyCallback>();
  return handler(event, context, callback);
}
