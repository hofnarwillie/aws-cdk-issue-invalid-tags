# AWS CDK Issue with deploying a @aws-cdk/aws-apigatewayv2-alpha/DomainName

This repo reproduces an issue in deploying a DomainName resource which results in the following error:

```
Stack Deployments Failed: Error: The stack named AwsCdkIssueInvalidTagsStack failed to deploy: UPDATE_ROLLBACK_COMPLETE: Invalid tag key. Tag keys cannot start with 'aws:' (case insensitive) (Service: AmazonApiGatewayV2; Status Code: 400; Error Code: BadRequestException; Request ID: c223a34b-8b42-458f-8be0-25cf8a904c25; Proxy: null)
```

This repo uses version 2.60.0 of CDK, but the issue is also visible using other versions. The resource was previously deployable using these exact versions and configurations, so I can only assume that it is not something introduced by the CDK package, but rather a new incompattibility with the AWS API, probably introduced by a change to the API.

Prerequisites:

1. An AWS authenticated environment
2. An existing hosted zone with a domain name
3. Ensure these environment variables are present:

```
CDK_DEFAULT_REGION=eu-west-1
CDK_DEFAULT_ACCOUNT=<account-id>
DOMAIN_NAME=<an existing hosted zone domain name>
```
