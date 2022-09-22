# Crud Sample

This project contains source code for both back-end and front end code 

## Frontend

The frontend was created using Create React App with typescript, the structure of the components was simplified to speed up development.


Important Points:
- react-query was used to access the data, all the calls to the apis are in a class in the file  srs/utils/contactsAccessor.ts.
- No state management was used, the data access and the general app control is made from src/view/phonebook.tsx 
- Access to the modals is controled from phonebook.tsx to improve performance and avoid sending functions too deep into the components tree
- Bootstrap-react was used in order to make the app looks like the sample

Some pending things:
- Improve Validation
- Add testing
- Reduce the number of variables used
- Improve styles 



## Backend


The backend is an AWS SAM sam application, it uses DynamoDB to store the data, Lambda Functions for 
execution and API Gateway, all those resources are created from the SAM Cloudformation template. It id base on the SAM cli kickstart project

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
sam deploy --stack-name CRUD --s3-prefix crudsapi \ 
--capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM CAPABILITY_IAM \
--parameter-overrides Environment=dev --resolve-s3
```

After running the last command the API url will be shown and it shoud be set in the file frontend/config.ts in order to allow the app to point to the proper endpoint.

Some pending things:
- Better validations needs to be added to the endpoints
- Improve unit testing coverage (./node_modules/.bin/jest --coverage)
- Improve code documentation