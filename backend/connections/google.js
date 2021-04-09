const axios = require('axios');
const {google} = require('googleapis');
const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
];

const clientId = '761895649618-4mqrsrablesejvi7mm71lrcdcg6r3mp7.apps.googleusercontent.com';
const clientSecret =  'p7jjJDrJ-7wxlYt0pZ47LteE';
// const redirectURI = 'http://65.0.169.215:5555/api/v1/auth/google-cb';
const redirectURI = 'http://localhost:5555/api/v1/auth/google-cb';

const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectURI
);

class GoogleConnection {
    static getUrl() {
        const url = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
            prompt: 'consent',
            // If you only need one scope you can pass it as a string
            scope: defaultScope
        });
        console.log(url);
        return url;
    }

    /**
     * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
     */
    static async getGoogleAccountFromCode(code) {
        const {tokens} = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens);
        console.log(tokens)
        const user = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`
            }
        })
        return user.data;
    }
}

module.exports = GoogleConnection
