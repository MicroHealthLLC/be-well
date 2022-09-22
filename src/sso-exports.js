let baseURL = "https://sandbox.d1i1dumyzwv0r6.amplifyapp.com/"

if (process.env.NODE_ENV == "development") {
    baseURL = "http://localhost:8080/"
}

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:954b13cc-6ce6-4a13-9b78-924e31738325",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_wVdpCj57S",
    "aws_user_pools_web_client_id": "1qmcaphes51fe8m92t43mbr2vk",
    "oauth": {
      domain: "be-well-beta.auth.us-east-1.amazoncognito.com",
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
    "aws_appsync_graphqlEndpoint": "https://uwctn5rkj5hajem4qwphxctfje.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_appsync_dangerously_connect_to_http_endpoint_for_testing": true,
    "aws_user_files_s3_bucket": "wellbeeing3f58a2ecb03248c2988066b315cb3ceb124038-sandbox",
    "aws_user_files_s3_bucket_region": "us-east-1",
    "aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing": true
};


export default awsmobile;
