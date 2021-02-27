const { User } = require("../models");
const { v4: uuidv4 } = require('uuid');

class UserService {
    static async createUser(userParams) {
        try {
            const {id, username = null, email = null, access_token, refresh_token, expires_in, avatar} = userParams;
            console.log('These are the user params');
            console.log(userParams);
            return await User.create({
                id: uuidv4(),
                email,
                username,
                access_token,
                refresh_token,
                expires_in,
                discordId: id,
                avatar
            });
        }
        catch (e) {
            console.log('Error while saving user');
            console.log(e);
        }
    }
    static async handleGoogleLogin(googleUser) {
        try {
            let user = await User.findOne({where: {googleId: googleUser.id}})
            if(!user) {
                user = await User.create({
                    id: uuidv4(),
                    googleId: googleUser.id,
                    googleName: googleUser.name,
                    googleEmail: googleUser.email,
                    googlePicture: googleUser.picture
                });
            }
            return user;
        } catch (e) {
            console.log('error occurred')
            return e;
        }
    }
    static async handleFacebookLogin(facebookUser) {
        try {
            let user = await User.findOne({where: {facebookId: facebookUser.id}})
            if(!user) {
                user = await User.create({
                    id: uuidv4(),
                    facebookId: facebookUser.id,
                    facebookName: facebookUser.name,
                    facebookEmail: facebookUser.email,
                    facebookPicture: facebookUser.picture.url
                });
            }
            return user;
        } catch (e) {
            console.log('error occurred')
            return e;
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            if(!user) return null;
            return user;
        } catch (e) {
            console.log('error occurred')
            return e;
        }
    }

    static async saveBuild(buildDetails) {
        try {
            const user = await User.findByPk(buildDetails.userId);
            if(!user) return null;
            const builds = JSON.parse(user.builds) || {};
            builds[buildDetails.identifier] = buildDetails.skillMap;
            user.builds = JSON.stringify(builds);
            await user.save();
            console.log('Updated user')
            console.log(user);
            return user;
        } catch (e) {
            console.log('error occurred')
            return e;
        }
    }

    static async getUserByDiscordId(discordId) {
        try {
            const user = await User.findOne({where: {discordId}})
            return user;
        } catch (e) {
            console.log('error occurred')
            return e;
        }
    }
}

module.exports = UserService;
