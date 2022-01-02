import { Stack } from "@aws-cdk/core";
import { Effect, ManagedPolicy, PolicyStatement } from "@aws-cdk/aws-iam";
import { RolePolicyProps } from "./types";

export class ApiGatewayPolicy {
  constructor(stack: Stack, { role, stackRegex }: RolePolicyProps) {
    const lambdaPolicy = new ManagedPolicy(stack, "ApiGatewayPolicy", {
      description: `Policy to manage API Gateway: ${stack.stackName}`,
      roles: [role],
    });

    lambdaPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/tags/*`],
        actions: ["apigateway:*"],
      })
    );
    lambdaPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/restapis`],
        actions: ["apigateway:POST"],
      })
    );
    lambdaPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/restapis/*`],
        actions: ["apigateway:*"],
        conditions: {
          StringLike: {
            "aws:ResourceTag/aws:cloudformation:stack-name": stackRegex,
          },
        },
      })
    );
  }
}
