# aws-sam-ts-graphql

[![Deploy][badge_svg_deploy]][workflow_link_deploy]
[![Check][badge_svg_check]][workflow_link_check]

Apollo GraphQL Server template with AWS SAM, TypeScript & Lambda. Boilerplate with GitHub CI/CD actions, best security practises such as least privileges IAM policies, automated dependency updates and much more.

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

[badge_svg_deploy]: https://github.com/rdok/aws-sam-ts-graphql/actions/workflows/deploy.yml/badge.svg?branch=main
[badge_svg_check]: https://github.com/rdok/aws-sam-ts-graphql/actions/workflows/check.yml/badge.svg
[workflow_link_deploy]: https://github.com/rdok/aws-sam-ts-graphql/actions/workflows/deploy.yml
[workflow_link_check]: https://github.com/rdok/aws-sam-ts-graphql/actions/workflows/check.yml
