
const { User } = require("../models");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const EmailService = require("./EmailService");
const JWTService = require("./JWTService");

class UserService {
    static async createUser(userParams) {
        try {
            const {name, email, password} = userParams;
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
            //TODO: Fix email logic
            // EmailService.sendEmail(user.email)
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

    static async updateUserPicks(currentUser , {stockPicks}) {
        try {
            console.log(stockPicks);
            const user = await User.findByPk(currentUser.user.id);
            if(!user) return 'User not found';
            user.stockPicks = stockPicks;
            await user.save();
            console.log('Updated user')
            return user;
        } catch (e) {
            console.log(e)
            console.log('error occurred')
            return e;
        }
    }

    static async getUserPicks(currentUser) {
        try {
            const user = await User.findByPk(currentUser.user.id);
            if(!user) return 'User not found';
            return user.stockPicks;
        } catch (e) {
            console.log(e)
            console.log('error occurred')
            return e;
        }
    }
}

module.exports = UserService;
