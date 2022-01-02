import { Stack } from "@aws-cdk/core";
import { Config } from "../lib/config";
import { Match, Template } from "@aws-cdk/assertions";
import { Role, User } from "@aws-cdk/aws-iam";
import { ApiGatewayPolicy } from "../lib/api-gateway-policy";

const config = new Config();
const stack = new Stack();
const stackRegex = `${config.org}-*-${config.name}*`;
const user = new User(stack, "CICDUser", { userName: "CICDStackName" });
const role = new Role(stack, "Role", { assumedBy: user });
new ApiGatewayPolicy(stack, { stackRegex, config, role });
const template = Template.fromStack(stack);

test("Authorise API Gateway creation", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: "apigateway:POST",
          Effect: "Allow",
          Resource: {
            "Fn::Join": [
              "",
              ["arn:aws:apigateway:", { Ref: "AWS::Region" }, "::/restapis"],
            ],
          },
        },
      ]),
    },
  });
});

test("Authorise management of created API Gateway resources", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Condition: {
            StringLike: {
              "aws:ResourceTag/aws:cloudformation:stack-name": stackRegex,
            },
          },
          Action: "apigateway:*",
          Effect: "Allow",
          Resource: {
            "Fn::Join": [
              "",
              ["arn:aws:apigateway:", { Ref: "AWS::Region" }, "::/restapis/*"],
            ],
          },
        },
      ]),
    },
  });
});

test("Authorise AWS SAM to tag API Gateway deployment & stage", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: "apigateway:*",
          Effect: "Allow",
          Resource: {
            "Fn::Join": [
              "",
              ["arn:aws:apigateway:", { Ref: "AWS::Region" }, "::/tags/*"],
            ],
          },
        },
      ]),
    },
  });
});
