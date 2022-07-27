const Training = require('../models/Training');
const Subject = require('../models/Subject');

exports.create = async(req, res) => {
    let data = req.body;
    console.log(data);
    try {
        const insert = await Training.create({
            name: data.name,
            subjects: data.subjects,
            streams: data.streams,
            updated_by: req.user._id
        });
        res.json(insert);
    } catch (err){
        console.log(err)
        let ret = "internal server error"
        if (err.code == 11000){
            ret = "duplicate value";
        };
        console.log(err.code);
        res.status(400).json(ret);
    };
};

exports.list = async(req, res) => {
    let data = req.query;
    try {
        let sortValue = req.query.sort == "DESC" ? -1 : 1;
        let filterObj = {};
        if (data.name){
            filterObj.name = data.name;
        };

        if (data.subjects){
            data.subjects = data.subjects.split(',')
            filterObj.subjects = {
                $in: data.subjects
            };
        };

        if (data.streams){
            data.streams = data.streams.split(',')
            filterObj.streams = {
                $in: data.streams
            };
        };

        const getData = await Training.find(filterObj,{_id: 1, name: 1, subjects: 1, streams: 1})
            .sort({name: sortValue});

        res.json(getData);
    } catch (err){
        console.log(err)
        let ret = "internal server error"
        console.log(err.code);
        res.status(400).json(ret);
    };  
};