import { Stack } from "@aws-cdk/core";
import { Effect, ManagedPolicy, PolicyStatement } from "@aws-cdk/aws-iam";
import { RolePolicyProps } from "./types";

export class ApiGatewayPolicy {
  constructor(stack: Stack, { role }: RolePolicyProps) {
    const lambdaPolicy = new ManagedPolicy(stack, "LambdaPolicy", {
      description: `Policy to manage API Gateway: ${stack.stackName}`,
      roles: [role],
    });
    lambdaPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/restapis`],
        actions: ["apigateway:POST"],
      })
    );
  }
}
