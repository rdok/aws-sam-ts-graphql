export AWS_REGION=$(shell jq -r '.region' infrastructurerc.json)
export NAME=$(shell jq -r '.name' infrastructurerc.json)
export ORG=$(shell jq -r '.org' infrastructurerc.json)
export AWS_CICD_STACK_NAME=$(shell echo "${ORG}-cicd-${NAME}")
export AWS_PROFILE=default

start-dev: node_modules
	npm run dev

InvokeGraphQL:
	node events/generate-api-gateway-event.js
	make build-npm
	sam build --template infrastructure.yml
	sam local invoke \
		--event events/APIGatewayProxyEvent.json \
		--template-file .aws-sam/build/template.yaml \
		--env-vars .env.dev.json \
		'GraphQL'


start-sam: node_modules
	make build-npm
	sam build --template infrastructure.yml
	sam local start-api --port 3003

deploy-cicd-auth:
	cd cicd-authorisation && make deploy

build-deploy-dev:
	make build
	make deploy-dev

deploy-dev:
	export AWS_PROFILE=cicd_aws_sam_ts_graphql && \
	AWS_ROLE_ARN=$$(aws --profile $$AWS_PROFILE --region $$AWS_REGION \
		cloudformation describe-stacks --stack-name $$AWS_CICD_STACK_NAME \
		--query 'Stacks[0].Outputs[?OutputKey==`CICDRoleARN`].OutputValue' \
		--output text) && \
	ASSUME_ROLE=$$(aws --profile $$AWS_PROFILE --region $$AWS_REGION --output json \
		sts assume-role --role-arn $$AWS_ROLE_ARN --role-session-name cicd-access \
		--query "Credentials") && \
	export AWS_ACCESS_KEY_ID=$$(echo $$ASSUME_ROLE | jq -r '.AccessKeyId') && \
	export AWS_SECRET_ACCESS_KEY=$$(echo $$ASSUME_ROLE | jq -r '.SecretAccessKey') && \
	export AWS_SESSION_TOKEN=$$(echo $$ASSUME_ROLE | jq -r '.SessionToken') && \
	sam deploy \
		--stack-name "$${ORG}-dev-$${NAME}" \
		--s3-bucket "$${ORG}-cicd-$${NAME}" \
		--s3-prefix "dev" \
		--region $${AWS_REGION} \
		--capabilities CAPABILITY_IAM \
		--no-fail-on-empty-changeset

update-all-npm:
#	nvm install 14
	npx npm-check --update-all
	cd cicd-authorisation && npx npm-check --update-all

test-watch:
	npm run test:watch
test:
	npm run test

prettier:
	npm run prettier
prettier-fix:
	npm run prettier:fix

lint:
	yarn lint
lint-fix:
	yarn lint:fix

build-npm: node_modules
	npm run build

node_modules:
	npm ci

check: test prettier lint
