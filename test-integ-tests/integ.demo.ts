import { ExpectedResult, IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack } from 'aws-cdk-lib';
const app = new App();
const testStack = new Stack(app, 'integTestStack', {});
const integ = new IntegTest(app, 'BaseIntegrationTest', {
  testCases: [testStack] });

const call = integ.assertions.awsApiCall('S3', 'listObjectsV2', {
  Bucket: 'jonas-test-42-idealo',
});

call.provider.addToRolePolicy({
  Effect: 'Allow',
  Action: ['s3:GetObject', 's3:ListBucket', 's3:*'],
  Resource: ['*'],
});

call.expect(ExpectedResult.objectLike({
  Contents: [ ExpectedResult.objectLike({  Key: 'testfile.txt',}) ]
}));
