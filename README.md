# Cognito Facial Recognition Auth Backend

The purpose of this sample code is to demonstrate how Amazon Cognito Custom Authentication Flows can be used to implement passwordless facial recognition auth using Amazon Rekognition. Please treat the code as an _**illustration**_––thoroughly review it and adapt it to your needs, if you want to use it for production-ready workloads.

This is an AWS Serverless Application. If you deploy it, this is what you get:

- An Amazon Rekognition Custom Collection for indexing User photos
- An Amazon DynamoDB Table to save and query for user and Rekognition metadata
- 2 Amazon S3 Buckets for holding User photos during Sign Up and Sign In phases
- An Amazon Cognito User Pool, pre-configured with AWS Lambda triggers to implement passwordless facial recognition auth
- An Amazon Cognito User Pool Client, that you can use to integrate with the User Pool
- The needed Lambda functions that serve as User Pool triggers
- The permissions on the Lambda functions so that the User Pool may invoke them

## Deployment instructions

Deploy either through the Serverless Application Repository or with the AWS SAM CLI

### Deployment through Serverless Application Repository

This is the easiest path. Find the Serverless Application in the [Repository](https://console.aws.amazon.com/serverlessrepo/) using tags "cognito" and "rekognition" or navigate to it directly with [this link](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:825350388019:applications~amazon-cognito-passwordless-facial-rekognition-auth).

If you deploy the Serverless Application you'll get a CloudFormation stack with the resources mentioned above. The outputs of the CloudFormation stack will contain the the ID's of the User Pool, Client that you can use in your client web app, your S3 Bucket Names, Collection ARN and DynamoDB table name.

### Alternative Deployment with AWS SAM CLI

#### Pre-requisites

1. Download and install [Node.js](https://nodejs.org/en/download/)
2. Download and install [AWS SAM CLI](https://github.com/awslabs/aws-sam-cli)
3. Of course you need an AWS account and necessary permissions to create resources in it. Make sure your AWS credentials can be found during deployment, e.g. by making your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY available as environment variables.
4. You need an existing S3 bucket to use for the SAM deployment. Create an empty bucket.

NOTE: To deploy this application _**please pick an AWS Region in which you can use Amazon Cognito and Amazon Rekognition (i.e. us-east-1, us-west-2 or eu-west-1)**_ and create all resources (including the S3 bucket) in that region. This is not a hard requirement for setting up e-mail auth in Cognito in general; but it is so in this demo application to keep things simple.

#### How to deploy the Serverless Application with AWS SAM CLI

1. Clone this repo `git clone https://github.com/aws-samples/amazon-cognito-facial-recognition-auth.git`
2. Enter cognito directory: `cd amazon-cognito-facial-recognition-auth`
3. Install dependencies: `npm install`
4. Set the following environment variables (all mandatory):
  - S3_BUCKET_NAME='the bucket name of the bucket you want to use for your SAM deployment'
  - SIGN_UP_S3_BUCKET='the bucket name of the bucket you want to use for your User's Photos upload during Sign Up'
  - SIGN_IN_S3_BUCKET='the bucket name of the bucket you want to use for your User's Camera Pictures during Sign In'
  - COLLECTION_NAME='the name you want your Amazon Rekognition Custom Collection to be created with'
  - STACK_NAME='the name you want the CloudFormation stack to be created with'
  - USER_POOL_NAME='the name you want your User Pool to be created with'
5. Build and deploy the application: `npm run bd` This runs AWS SAM CLI

if that succeeded, you have succesfully deployed your application. The outputs of the CloudFormation stack will contain, the ID's of the User Pool, Client that you can use in your client web app, your S3 Bucket Names, Collection ARN and DynamoDB table name.

## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.