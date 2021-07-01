const { v4: uuidv4 } = require('uuid');
const JWT = require('jsonwebtoken');
const moment  = require('moment');
const { User } = require("../models");

const JWT_SECRET = '04i-293u4-0234';

class JWTService {
    static validJWTS = {};

    static generateJWTToken(user, logInMethod) {
        console.log(user.id)
        const payload = {
            userId: user.id,
            random: uuidv4(),
            expireAt: "10d",
            logInMethod
        };
        return JWT.sign(payload, JWT_SECRET);
    }

    static async addJWTToken({jwtToken, user}) {
        if (this.validJWTS[user.id]) {
            this.validJWTS[user.id].push(jwtToken);
        } else {
            this.validJWTS[user.id] = [jwtToken];
        }
    }

    static async removeJWTToken({jwtToken, user}) {
        if (this.validJWTS[user.id]) {
            const index = this.validJWTS[user.id].indexOf(jwtToken);
            if (index >= 0) {
                this.validJWTS[user.id].splice(index, 1);
            }
        }
    }

    static async getUserFromJWTToken(jwtToken){
        try {
            const decoded = JWT.verify(jwtToken, JWT_SECRET);
            const {userId, expireAt, logInMethod} = decoded;
            // if (expireAt < moment().toISOString()) { // if expiredAt is lesser than current time
            //     return null;
            // }
            const user = await User.findByPk(userId, {raw: true});
            return user;

        } catch (e) {
            return null;
        }
    }
}

module.exports = JWTService
