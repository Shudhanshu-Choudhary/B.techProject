const express = require('express');
const constants = require('../../../constants')
const UserService = require("../../../services/UserService");
const userRouter = express.Router();

userRouter.put('/update-picks', async (req, res) => {
    console.log('User update picks called')
    const user = await UserService.updateUserPicks(req.user ,req.body);
    res.status(200).send(user);
});

module.exports = {userRouter};
