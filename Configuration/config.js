const mongoose = require('mongoose');
require('dotenv').config();

const connection = () => {
    return mongoose
        .connect(process.env.CONNECTION_STRING)
        .then(() => console.log('DB is Connecting.......'));
};
module.exports = connection;
