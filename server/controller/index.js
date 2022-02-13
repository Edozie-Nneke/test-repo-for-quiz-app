const axios = require('axios');
const querystring = require('querystring');
// Application environment virables
const {
  grantType,
  codeChallengeMethod,
  snapchatClientID,
  snapchatRedirectURL,
  snapchatAuthorizationURI,
  snapchatTokenURI,
  snapchatUserInfoURI,
} = require('../config');

// Generation of 0Auth code challenge
const generate_code_challenge = require('../utils/generateCodeChallenge');
// Genaration of redirection URIs with associated query strings
const getAuthCodeRedirectURL = require('../utils/getAuthCodeRedirectURL');
// Genration of client state for bot cashtoken and snapchat authenticator
const generateClientState = require('../utils/generateRandomBytes');

// generate state for snap chat
const snapchatState = generateClientState();
let userAccessToken;
let snapchatCodeChallenge;
let snapchatCodeVerifier;

// application logic for user profile
exports.userProfile = async (req, res) => {
  const userProfile = await axios.post(
    snapchatUserInfoURI,
    { query: '{me{displayName bitmoji{avatar} externalId}}' },
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }
  );
  if (userProfile.status !== 200) {
    res.redirect(`/dashboard?successful=false`);
  } else {
    const { data } = userProfile.data;
    res.redirect(
      `http://localhost:3001/startpage?name=${data.me.displayName}&avatar=${
        data.me.bitmoji.avatar ||
        'https://res.cloudinary.com/at-health/image/upload/v1640870504/ATHEALTH/Images/aeqeerxhz0lxxev9k7zw.png'
      }&accessToken=${userAccessToken}`
    );
    // res.render('pages/profile.ejs', {
    //   avatar:
    //     data.me.bitmoji.avatar ||
    //     'https://res.cloudinary.com/at-health/image/upload/v1640870504/ATHEALTH/Images/aeqeerxhz0lxxev9k7zw.png',
    //   displayName: data.me.displayName,
    //   dashboardURI,
    //   email: null,
    // });
  }
};

// application logic for snapchat authorization
exports.snapchatAuth = async (req, res) => {
  //generate code challenge and code verifier for snapchat authentication
  if (!snapchatCodeChallenge) {
    ({
      code_challenge: snapchatCodeChallenge,
      code_verifier: snapchatCodeVerifier,
    } = generate_code_challenge());
  }
  let snapchatScopeList = [
    'https://auth.snapchat.com/oauth2/api/user.display_name',
    'https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar',
  ];

  // generate snapchat authorization URL
  const authorizationtURL = getAuthCodeRedirectURL(
    snapchatClientID,
    snapchatRedirectURL,
    snapchatScopeList,
    snapchatState,
    snapchatCodeChallenge,
    codeChallengeMethod,
    snapchatCodeVerifier,
    snapchatAuthorizationURI
  );

  // Redirect user to get consent
  res.redirect(authorizationtURL);
};

// application logic for cashtoken and snapchat callback URI
exports.callback = async (req, res) => {
  const { code, state: authState } = req.query;

  await handleCallback(
    {
      client_id: snapchatClientID,
      state: authState,
      code,
      grant_type: grantType,
      redirect_uri: snapchatRedirectURL,
      code_verifier: snapchatCodeVerifier,
    },
    snapchatState,
    authState,
    snapchatTokenURI,
    res,
    'snapchat'
  );
};

// application logic for snapchat user logout
exports.logout = async (req, res) => {
  /**
   * TODO: Revoke user access token before loging out
   */
  res.redirect('/?logout=true');
};

async function handleCallback(data, state, authState, tokenURI, res) {
  if (state !== authState) {
    res.redirect('/?successful=false');
  }

  const userTokens = await axios.post(tokenURI, querystring.stringify(data));

  if (userTokens.status === 200) {
    const { access_token, id_token } = userTokens.data;
    userAccessToken = access_token;
    res.redirect('/user_profile');
  } else {
    res.redirect('/?successful=false');
  }
}
