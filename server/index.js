require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const {
  userProfile: profile,
  callback,
  snapchatAuth,
  logout,
} = require('./controller');
const { port } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Callback route for snapchat
router.get('/snapchat', callback);

// snapchat authenticator route
router.get('/auth/snapchat', snapchatAuth);
// user profile route
router.get('/user_profile', profile);
// signout route
router.get('/signout', logout);

// Application router
app.use('/', router);
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
