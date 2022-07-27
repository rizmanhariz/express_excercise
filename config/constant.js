const ENV = process.env.ENV || 'development';
var constantObj = {
    mongo_connection_string: "",
    hashSalt: ""
};

const secrets = require('./secrets');
constantObj.mongo_connection_string = secrets.mongo_connection_string;
constantObj.hashSalt = secrets.hashSalt;

exports.init = () => {
    return constantObj;
}