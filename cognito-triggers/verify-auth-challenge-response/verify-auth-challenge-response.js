var aws = require('aws-sdk');
var rekognition = new aws.Rekognition();

exports.handler = async (event, context) => {

    console.log("Verify Auth Challenge: " + JSON.stringify(event));
    let userPhoto = '';
    event.response.answerCorrect = false;

    // Searching existing faces indexed on Rekognition using the provided photo on s3

    const objectName = event.request.challengeAnswer;
    const params = {
        "CollectionId": process.env.COLLECTION_NAME,
        "Image": {
            "S3Object": {
                "Bucket": process.env.BUCKET_SIGN_UP,
                "Name": objectName
            }
        },
        "MaxFaces": 1,
        "FaceMatchThreshold": 90
    };
    try {
        const data = await rekognition.searchFacesByImage(params).promise();

        // Evaluates if Rekognition was able to find a match with the required 
        // confidence threshold

        if (data.FaceMatches[0]) {
            console.log('Face Id: ' + data.FaceMatches[0].Face.FaceId);
            console.log('Similarity: ' + data.FaceMatches[0].Similarity);
            userPhoto = data.FaceMatches[0].Face.FaceId;
            if (userPhoto) {
                if (event.request.privateChallengeParameters.answer == userPhoto) {
                    event.response.answerCorrect = true;
                }
            }
        }
    } catch (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        throw err;
    }
    return event;
}