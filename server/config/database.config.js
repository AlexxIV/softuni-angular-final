const MONGOOSE = require('mongoose');

MONGOOSE.Promise = global.Promise;

module.exports = (config) => {
    MONGOOSE.connect(config.connectionString);

    let db = MONGOOSE.connection;

    db.once('open', (err) => {
        if (err) {
            throw err;
        }

        console.log('MongoDB is ready!');
    });

    // Seed Imports
    require('../models/User');
    require('../models/Role').init();
};