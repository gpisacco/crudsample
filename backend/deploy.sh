sam build
sam deploy --stack-name CRUD --s3-prefix crudsapi \
--capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM CAPABILITY_IAM \
--parameter-overrides Environment=dev --resolve-s3