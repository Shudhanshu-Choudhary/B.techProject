const JWTService = require("../services/JWTService");

const authMiddleware = async function (req, res, next) {
    if(!req.headers.token){
        res.status(401).send('Unauthorized');
        return;
    }
    const token = req.headers.token;
    if(!token){
        res.status(401).send('Unauthorized');
        return;
    }
    console.log(token)
    const user = await JWTService.getUserFromJWTToken(token);
    if(!user) {
        res.status(401).send('User not found. Login again');
        return;
    }
    req.user = user;
    next()
}

module.exports = authMiddleware;
