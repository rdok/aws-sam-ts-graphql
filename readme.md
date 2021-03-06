# aws-sam-ts-graphql

[![Deploy][badge_svg_deploy]][workflow_link_deploy]
[![Check][badge_svg_check]][workflow_link_check]

Apollo GraphQL Server template with AWS SAM, TypeScript & Lambda.

### cURL GraphQL Request Example

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://4r0gh327k1.execute-api.eu-west-1.amazonaws.com/Prod/graphql' \
  --data-raw '{"query":"query Launches($limit: Int, $page: Int, $launchId: ID!) { healthCheck launch(id: $launchId) { id } launches(limit: $limit, page: $page) { limit page data { id name } }}","variables":{"launchId":"5eb87cdbffd86e000604b32d","limit":3,"page":3},"operationName":"Launches"}'
```

# Features

- Compiles NodeJS TypeScript to JS for AWS Lambda.
- Uses SAM template to create API Gateway, Lambda function with GraphQL
- Unit tests the Lambda handlers & libraries.
- Runs CI/CD pipelines through GitHub Actions.
- [Grants the least privileges](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege) CI/CD security best practise; through AWS CDK unit tested.
- [Delegates permissions through role](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles) CI/CD security best practise; through AWS CDK unit tested.
- Rapidly deploys dev stack locally through Makefile commands
- Automates dependency updates for NPM packages.
- Automates dependency updates for GitHub actions dependencies.
- Reuses CI checks through [reusable GitHub workflows](https://docs.github.com/en/actions/learn-github-actions/reusing-workflows)
- Ensures [![Deploy][badge_svg_deploy]][workflow_link_deploy] workflow runs at a time through GitHub's [concurrency](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#concurrency) feature.
- Restricts NodeJS engine version to 14, same as AWS Lambda
- Disables Apollo Studio on production environment.

# Setup

- [Use this template][use_this_template] to create a new GitHub repository.
- Clone your repository on your local machine.
- Configure AWS CloudFormation, such as stack name, region, and others through `infrastructurerc.json`
- Find & global replace `aws-sam-ts` with your service name.
- Create & authorise the CI/CD user with the least privileges. These have to be generated through your local machine to avoid putting administrator IAM credentials online.
  - `cd cicd-authorisation && make deploy`
  - Use the link from the output to visit the newly created IAM user.
  - Create access key
- Add this access key as [GitHub encrypted repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)
- Once you commit & git push to main branch, it will be deployed to the default test stack
- Deploy to production environment by clicking the `Run workflow` button in `Deploy` action. [Example](https://github.com/rdok/aws-sam-ts/actions/workflows/deploy.yml)

[use_this_template]: https://github.com/rdok/aws-sam-ts-graphql/generate
[badge_svg_deploy]: https://github.com/rdok/aws-sam-ts-graphql/actions/workflows/deploy.yml/badge.svg?branch=main
[badge_svg_check]: https://github.com/rdok/aws-sam-ts-graphql/actions/workflows/check.yml/badge.svg
[workflow_link_deploy]: https://github.com/rdok/aws-sam-ts-graphql/actions/workflows/deploy.yml
[workflow_link_check]: https://github.com/rdok/aws-sam-ts-graphql/actions/workflows/check.yml
