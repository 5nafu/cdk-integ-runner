import { ExpectedResult, IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack } from 'aws-cdk-lib';
const app = new App();
const testStack = new Stack(app, 'integTestStack', {});
const integ = new IntegTest(app, 'BaseIntegrationTest', {
  testCases: [testStack] });

const call = integ.assertions.awsApiCall('S3', 'listBuckets')
call.expect(ExpectedResult.objectLike({}));
