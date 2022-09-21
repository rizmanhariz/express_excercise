const Subject = require('../models/Subject');

exports.create = async(req, res) => {
    let data = req.body;
    try {
        const insert = await Subject.create({
            name: data.name,
            stream: data.stream,
            updated_by: req.user._id
        });
        res.json(insert);
    } catch (err){
        let ret = "internal server error"
        if (err.code == 11000){
            ret = "duplicate value";
        };
        res.status(400).json(ret);
    }
    
};

exports.list = async(req, res) => {
    try {
        let sortValue = req.query.sort == "DESC" ? -1 : 1;
        const getData = await Subject.find({},{_id: 1, name: 1, stream: 1})
            .sort({name: sortValue})
            .limit(req.query.limit || 10);

        res.json(getData);
    } catch (err){
        let ret = "internal server error"
        res.status(400).json(ret);
    }
    
};