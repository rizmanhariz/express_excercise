const User = require('../models/User');

exports.create = async(req, res) => {
    let data = req.body;
    try {
        const insert = await Training.create({
            name: data.name,
            subjects: data.subjects,
            streams: data.streams,
            updated_by: req.user.email
        });
        res.json(insert);
    } catch (err){
        let ret = "internal server error"
        if (err.code == 11000){
            ret = "duplicate value";
        };
        res.status(400).json(ret);
    };
};

exports.getMe = async(req, res) => {
    res.json({
        name: req.user.name,
        email: req.user.email,
        name: req.user.name
    })
};

exports.updateMe = async(req, res) => {
    try {
        var updateRes = await User.updateOne({_id: req.user._id}, 
            {
                $set: {name: req.body.name}
            }
        );

        if (updateRes.acknowledged){
            res.send("Success");
        } else {
            throw('Error');
        }
    } catch (err){
        let ret = "internal server error"
        if (err.code == 11000){
            ret = "duplicate value";
        };
        res.status(400).json(ret);
    };
};