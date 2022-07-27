const mongoose = require('mongoose');
const CONSTANTS = require('./constant').init();
const ENV = process.env.ENV || 'development';

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(CONSTANTS.mongo_connection_string, {
            autoIndex: ENV == 'development',
            autoCreate: ENV == 'development',
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
};