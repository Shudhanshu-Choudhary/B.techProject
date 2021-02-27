const express = require('express');
const UserService = require('../../../services/UserService');
const GoogleConnection = require('../../../connections/google');
const FacebookConnection = require("../../../connections/facebook");

const authRouter = express.Router();

authRouter.get('/login/google', async (req, res) => {
    const gLoginUrl = await GoogleConnection.getUrl()
    console.log(gLoginUrl)
    res.redirect(gLoginUrl);
});

authRouter.get('/google-cb', async (req, res) => {
    const code = req.query.code;
    let googleUser = await GoogleConnection.getGoogleAccountFromCode(code)
    //{
    //   id: '107253685624697510475',
    //   email: 'coolrishabhrawat@gmail.com',
    //   verified_email: true,
    //   name: 'Rishabh Rawat',
    //   given_name: 'Rishabh',
    //   family_name: 'Rawat',
    //   picture: 'https://lh3.googleusercontent.com/a-/AOh14GhutBxPgWIY3MHTiCZ-iC3AhEobPxQr-Z0fzFd7Nw=s96-c',
    //   locale: 'en-GB'
    // }
    // console.log(user)
    const user = await UserService.handleGoogleLogin(googleUser)
    console.log('Returning this user');
    console.log(user);
    res.send({user, logInMethod: 'google'});
});

authRouter.get('/login/facebook', async (req, res) => {
    const fbLoginUrl = await FacebookConnection.getLoginUrl()
    console.log(fbLoginUrl)
    res.redirect(fbLoginUrl);
});

authRouter.get('/facebook-cb', async (req, res) => {
    const code = req.query.code;
    const facebookUser = await FacebookConnection.getUserFrom(code)
    //{
    //   id: '3744791465575617',
    //   email: 'coolrishabhrawat@gmail.com',
    //   first_name: 'Rishabh',
    //   last_name: 'Ŕáwãt',
    //   name: 'Rishabh Ŕáwãt',
    //   picture: {
    //     data: {
    //       height: 50,
    //       is_silhouette: false,
    //       url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3744791465575617&height=50&width=50&ext=1616654921&hash=AeTcYKwDqNo_jGILGG0',
    //       width: 50
    //     }
    //   }
    // }
    const user = await UserService.handleFacebookLogin(facebookUser)
    console.log(user)
    res.send({user, logInMethod: 'facebook'});
});

module.exports = {authRouter};
