const FB = require('fb');
// const fb = new FB.Facebook(options);
const APP_SECRET = '278b96061b4db7519a2169a6adf9150f';
const APP_ID = '1835897913230373'
const axios = require('axios')
const queryString = require('querystring');

const stringifiedParams = queryString.stringify({
    client_id: APP_ID,
    // redirect_uri: 'http://localhost:5555/api/v1/auth/facebook-cb',
    redirect_uri: 'http://localhost:5555/api/v1/auth/facebook-cb',
    // redirect_uri: 'http://65.0.169.215:5555/api/v1/auth/facebook-cb',
    scope: ['email', 'public_profile'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest'
});

const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

class FacebookConnection {
    static getLoginUrl () {
        return facebookLoginUrl;
    }
    static async getUserFrom(code) {
        const { data } = await axios({
            url: 'https://graph.facebook.com/v4.0/oauth/access_token',
            method: 'get',
            params: {
                client_id: APP_ID,
                client_secret: APP_SECRET,
                redirect_uri: 'http://localhost:5555/api/v1/auth/facebook-cb',
                code,
            },
        });
        console.log(data); // { access_token, token_type, expires_in }
        const user = await FacebookConnection.getFacebookUserData(data.access_token)
        console.log(user);
        return user;
    };

    static async getFacebookUserData(access_token) {
        const { data } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
                fields: ['id', 'email', 'first_name', 'last_name', 'name', 'picture'].join(','),
                access_token: access_token,
            },
        });
        console.log(data); // { id, email, first_name, last_name }
        return data;
    };
}

module.exports = FacebookConnection;
