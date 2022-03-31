const express = require('express');
const UserService = require('../../../services/UserService');
const GoogleConnection = require('../../../connections/google');
const FacebookConnection = require("../../../connections/facebook");
const constants = require('../../../constants')
const JWTService = require("../../../services/JWTService");
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
    const user = await UserService.handleGoogleLogin(googleUser)
    const token = await JWTService.generateJWTToken(user, 'google');
    const url = `${constants.appUrl}/?token=${token}`
    res.redirect(url);
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
    const token = await JWTService.generateJWTToken(user, 'facebook');
    const url = `${constants.appUrl}/?token=${token}`
    res.redirect(url);
});

authRouter.post('/register', async (req, res) => {
    const body = req.body;
    const user = await UserService.createUser(body);
    res.status(201).send(user);
})

authRouter.post('/login', async (req, res) => {
    const body = req.body;
    const user = await UserService.login(body);
    const token = await JWTService.generateJWTToken(user, 'facebook');

    if(user === 'Invalid email') {
        res.status(400).send(('Invalid email'));
    } else if(user === 'Invalid password') {
        res.status(400).send(('Invalid password'));
    } else res.status(200).send({user, token});
})

module.exports = {authRouter};
