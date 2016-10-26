"use strict";

var Sequelize = require('sequelize');

module.exports = function (config) {
    console.log("config.db ", config.db);
    if (process.env.HEROKU_POSTGRESQL_YELLOW_URL){
        var match = process.env.HEROKU_POSTGRESQL_YELLOW_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
        return new Sequelize(match[5], match[1], match[2], {
            dialect:  'postgres',
            protocol: 'postgres',
            port:     match[4],
            host:     match[3],
            logging: false,
            dialectOptions: {
                ssl: true
            }
        });
    }else {
        return new Sequelize(config.db.database, config.db.user, config.db.password, {
            host: config.db.host,
            dialect: config.db.driver,
            port: config.db.port
        });
    }
};
