const {
    CASHTOKEN_AUTHORIZATION_URI, 
    GRANT_TYPE,
    CASHTOKEN_TOKEN_URI, 
    CASHTOKEN_USERINFO_URI, 
    CASHTOKEN_CLIENT_ID, 
    CASHTOKEN_REDIRECT_URI, 
    CODE_CHALLENGE_METHOD,
    RESPONSE_TYPE,
    CASHTOKEN_SIGNOUT_URI,
    PORT,
    SNAPCHAT_CLIENT_ID,
    SNAPCHAT_CLIENT_SECRET,
    SNAPCHAT_REDIRECT_URI,
    SNAPCHAT_TOKEN_URI,
    SNAPCHAT_AUTHORIZATION_URI,
    SNAPCHAT_USERINFO_URI,
    ENVIRONMENT
} = process.env

module.exports = {
    cashtokenAuthorizationURI: CASHTOKEN_AUTHORIZATION_URI,
    grantType: GRANT_TYPE,
    cashTokenTokenURI: CASHTOKEN_TOKEN_URI,
    cashTokenUserInfoURI: CASHTOKEN_USERINFO_URI,
    cashTokenSignoutURI: CASHTOKEN_SIGNOUT_URI,
    cashtokenClientID: CASHTOKEN_CLIENT_ID,
    cashtokenRedirectURI: CASHTOKEN_REDIRECT_URI,
    codeChallengeMethod: CODE_CHALLENGE_METHOD,
    responseType: RESPONSE_TYPE,
    port: PORT,
    snapchatClientID: SNAPCHAT_CLIENT_ID,
    snapchatAuthorizationURI: SNAPCHAT_AUTHORIZATION_URI,
    snapchatTokenURI: SNAPCHAT_TOKEN_URI,
    clientSecret: SNAPCHAT_CLIENT_SECRET,
    snapchatRedirectURL: SNAPCHAT_REDIRECT_URI,
    snapchatUserInfoURI: SNAPCHAT_USERINFO_URI,
    environment: ENVIRONMENT,
    protocol: ENVIRONMENT === 'development' ? 'http' : 'https',
}