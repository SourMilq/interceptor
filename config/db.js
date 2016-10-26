"use strict";

var Sequelize = require('sequelize');

module.exports = function (config) {
    console.log("config.db ", config.db);
    if (process.env.HEROKU_POSTGRESQL_YELLOW_URL){
        return new Sequelize("dm45v0ovsn50j", "jrvlibviistvhv", "UFylZssdZWn0JD3f5vxljaioAK", {
            dialect: 'postgres',
            protocol: 'postgres',
            port: 5432,
            host: 'ec2-54-243-203-143.compute-1.amazonaws.com',
            logging: false
        });
    }else {
        return new Sequelize(config.db.database, config.db.user, config.db.password, {
            host: config.db.host,
            dialect: config.db.driver,
            port: config.db.port
        });
    }
};
