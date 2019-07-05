const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {

    console.log("Create auth challenge: " + JSON.stringify(event));

    if (event.request.challengeName == 'CUSTOM_CHALLENGE') {
        event.response.publicChallengeParameters = {};

        let answer = '';
        // Querying for Rekognition ids for the e-mail provided
        const params = {
            TableName: process.env.COLLECTION_NAME,
            IndexName: "FullName-index",
            ProjectionExpression: "RekognitionId",
            KeyConditionExpression: "FullName = :userId",
            ExpressionAttributeValues: {
                ":userId": event.request.userAttributes.email
            }
        }
        
        try {
            const data = await dynamodb.query(params).promise();
            data.Items.forEach(function (item) {
                
                answer = item.RekognitionId;

                event.response.publicChallengeParameters.captchaUrl = answer;
                event.response.privateChallengeParameters = {};
                event.response.privateChallengeParameters.answer = answer;
                event.response.challengeMetadata = 'REKOGNITION_CHALLENGE';
                
                console.log("Create Challenge Output: " + JSON.stringify(event));
                return event;
            });
        } catch (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw err;
        }
    }
    return event;
}
