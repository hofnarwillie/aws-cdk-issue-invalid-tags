#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkIssueInvalidTagsStack } from '../lib/aws-cdk-issue-invalid-tags-stack';


const {
  CDK_DEFAULT_ACCOUNT,
  CDK_DEFAULT_REGION,
} = process.env;

const app = new cdk.App();
new AwsCdkIssueInvalidTagsStack(app, 'AwsCdkIssueInvalidTagsStack', {
  env: {
    account: CDK_DEFAULT_ACCOUNT,
    region: CDK_DEFAULT_REGION,
  },
});