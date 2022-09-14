const {createHmac} = require('crypto');
const hashSalt = require('../config/constant').init().hashSalt;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
exports.login = async(req, res, next) => {
    try {
        console.log(anak)
        let hashedPassword = hashPW(req.body.password);
        const loginAttempt = await User.findOne({
            email: req.body.email,
            password: hashedPassword,
        });

        if (!loginAttempt){
            return res.status(401).send('Invalid email/password');
        };
        
        let uid = loginAttempt._id;
        var token = jwt.sign({ uid }, hashSalt);
        
        res.json({token, name: loginAttempt.name});
        
    } catch (err){
        console.log(err)
        let ret = "internal server error"
        if (err.code == 11000){
            ret = "duplicate value";
            console.log(err.code);
            res.status(500).json(ret);
        } else {
            next(err)
        };
    };
};

exports.register = async(req, res) => {
    try {
        let hashedPassword = hashPW(req.body.password);
        const registerAttempt = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        });

        let uid = registerAttempt._id;
        var token = jwt.sign({ uid }, hashSalt);
        
        res.json({token});
    } catch (err){
        let ret = "internal server error"
        let status = 500;
        if (err.code == 11000){
            status = 400;
            ret = "duplicate email";
        };
        console.log(err.code);
        res.status(status).json(ret);
    };
    
};

exports.updatePW = async(req, res) => {
    try {
        // validate old pw;
        let oldPw = hashPW(req.body.old_password);
        if (req.user.password != oldPw){
            return res.status(400).send('Old password is wrong');
        };
        // 
        let hashedNewPassword = hashPW(req.body.new_password);
        
        await User.updateOne({_id: req.user._id}, {$set: {password: hashedNewPassword}});
        res.send("Success");
    } catch (err){
        console.log(err)
        let ret = "internal server error"
        let status = 500;
        if (err.code == 11000){
            status = 400;
            ret = "duplicate email";
        };
        console.log(err.code);
        res.status(status).json(ret);
    };
    
};

function hashPW(password){
    let hashedPassword = createHmac('sha256', hashSalt);
    hashedPassword.update(password);
    return hashedPassword.digest('hex')
}