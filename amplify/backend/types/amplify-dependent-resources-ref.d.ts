export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "wellbeeinge2bd9338": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "api": {
        "wellbeeing": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "WellBeeingFiles": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "S3Trigger9c40585d": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}