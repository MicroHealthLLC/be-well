let baseURL = "https://beta.d1i1dumyzwv0r6.amplifyapp.com/"
let graphQLEndpoint = "https://ljertf3kdrghnnu37weavbpf5u.appsync-api.us-east-1.amazonaws.com/graphql"

if (process.env.NODE_ENV == "development") {
    console.log(process.env)
    baseURL = "http://localhost:8080/"
    graphQLEndpoint = process.env.VUE_APP_GRAPHQL_ENDPOINT
}

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:954b13cc-6ce6-4a13-9b78-924e31738325",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_LFKE2NdwM",
    "aws_user_pools_web_client_id": "2ldpgbq78qlq1cpphht9d8k57q",
    "oauth": {
      domain: "beta-be-well.microhealthllc.com",
      scope: ["email", "openid", "phone", "aws.cognito.signin.user.admin"],
      redirectSignIn: `${baseURL}`,
      redirectSignOut: `${baseURL}`,
      responseType: "code"
    },
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OPTIONAL",
    "aws_cognito_mfa_types": [
        "SMS",
        "TOTP"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "PHONE_NUMBER"
    ],
    "aws_appsync_graphqlEndpoint": `${graphQLEndpoint}`,
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_appsync_dangerously_connect_to_http_endpoint_for_testing": true,
    "aws_user_files_s3_bucket": "wellbeeing3f58a2ecb03248c2988066b315cb3ceb124038-sandbox",
    "aws_user_files_s3_bucket_region": "us-east-1",
    "aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing": true
};


export default awsmobile;
