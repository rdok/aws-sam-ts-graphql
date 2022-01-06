import { Stack } from "@aws-cdk/core";
import { Effect, ManagedPolicy, PolicyStatement } from "@aws-cdk/aws-iam";
import { RolePolicyProps } from "./types";

export class ApiGatewayPolicy {
  constructor(stack: Stack, { role, stackRegex }: RolePolicyProps) {
    const managedPolicy = new ManagedPolicy(stack, "ApiGatewayPolicy", {
      description: `Policy to manage API Gateway: ${stack.stackName}`,
      roles: [role],
    });

    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/tags/*`],
        actions: ["apigateway:*"],
      })
    );
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/restapis`],
        actions: ["apigateway:POST"],
      })
    );
    managedPolicy.addStatements(
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
