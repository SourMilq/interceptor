"use strict";

var Sequelize = require('sequelize');

module.exports = function (config) {
    console.log("config.db ", config.db);
    return new Sequelize(config.db.database, config.db.user, config.db.password, {
        host: config.db.host,
        dialect: config.db.driver,
        port: config.db.port,
        pool: {
            maxConnections: 10,
            minConnections: 1,
            maxIdleTime:    1000
        }
    });
};
