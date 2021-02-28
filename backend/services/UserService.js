const { User } = require("../models");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class UserService {
    static async createUser(userParams) {
        try {
            const {name, email, password} = userParams;
            console.log('These are the user params');
            const passwordHash = await bcrypt.hash(password, 10);
            console.log(userParams);
            return await User.create({
                id: uuidv4(),
                name,
                email,
                password: passwordHash,
            });
        }
        catch (e) {
            console.log('Error while saving user');
            console.log(e);
        }
    }

    static async login(userParams) {
        try {
            const {email, password} = userParams;
            console.log('These are the user params');
            const user = await User.findOne({ where: {email} });
            console.log(user)
            if (!user) {
                return 'Invalid email'
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(userParams);

            if(!passwordMatch) {
                return 'Invalid password'
            }
            return user;
        }
        catch (e) {
            console.log('Error while logging user');
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
                    facebookPicture: facebookUser.picture.data.url
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
