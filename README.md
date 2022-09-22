# crudsample

This project contains source code for both back-end and front end code 


The back-end is an AWS SAM sam application, it uses DynamoDB to store the data, Lambda Functions for 
execution and API Gateway, all those resources are created from the SAM Cloudformation template. 

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Jest Unit tests for the application code. 
- `template.yaml` - A template that defines the application's AWS resources.
- `swagger.yaml` - The API descrition in OAS 3 format.

The procedure to build the app is the following:
```bash
npm install
sam build
npm run test
sam deploy --stack-name CRUD --s3-prefix crudsapi --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM CAPABILITY_IAM --parameter-overrides Environment=dev --resolve-s3
```

After running the last command the API url will be shown and it shoud be set in the file frontend/config.ts in order to allow the app to point to the proper endpoint.

Some pending things:
- Better validations needs to be added to the endpoints
- Improve unit testing coverage (./node_modules/.bin/jest --coverage)
- Improve code documentation