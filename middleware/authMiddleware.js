const {verify} = require('jsonwebtoken');
const hashSalt = require('../config/constant').init().hashSalt;
const User = require('../models/User');
exports.authMiddleware = async (req, res, next) => {
    if (!req.headers.token){
        return res.status(401).send('missing `token` in header');
    };

    try {
        let verifyData = verify(req.headers.token, hashSalt);
        let user = await User.findById(verifyData.uid).exec();
        if (!user){
            throw('user not in db')
        }
        req.user = user;
    } catch (err) {
        return res.status(401).send("Unauthorized");
    };
    next();
};

exports.adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user.isAdmin){
            throw('unauth');
        };
    } catch (err) {
        return res.status(401).send("Not an admin");
    };
    next();
};