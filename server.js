"use strict";

var restify = require('restify');
var bunyan = require('bunyan');
var config = require('./config/default');
var sequelize = require('./config/db')(config);
var models = require('./app/models')(sequelize);
var _ = require('lodash');

// Security layer
var authenticationHelpers = require('./app/common/authentication')(config);

// Helpers for the endpoints
var userHelpers = require('./app/helpers/userHelpers')(models, authenticationHelpers);
var listHelpers = require('./app/helpers/listHelpers')(models, authenticationHelpers);
var itemHelpers = require('./app/helpers/itemHelpers')(models, authenticationHelpers);

// Functions to handle endpoint logic
var userHandlers = require('./app/routes/userHandlers')(userHelpers, listHelpers, authenticationHelpers);
var listHandlers = require('./app/routes/listHandlers')(listHelpers);
var itemHandlers = require('./app/routes/itemHandlers')(listHelpers, itemHelpers);

var passport = require('passport');

// Authentication methods
var strategies = require('./app/authentication/strategies')(userHelpers, authenticationHelpers);

passport.use(strategies.BasicStrategy);
passport.use(strategies.BearerStrategy);

var restifyLogger = new bunyan({
    name: 'restify',
    streams: [
        {
            level: 'error',
            stream: process.stdout
        },
        {
            level: 'info',
            stream: process.stdout
        }
    ]
});


var server = restify.createServer({
    log: restifyLogger,
});

// Add audit logging
server.on('after', restify.auditLogger({
    log: restifyLogger
}));

// Log uncaught exceptions
server.on('uncaughtException', function (req, res, route, error) {
    req.log.error(error);
    res.send(500, new Error(error));
});

// Restify config
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(passport.initialize());

server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
});

server.pre(restify.sanitizePath());
server.use(function (req, res, next) {
    if ((req.method === "PUT" || req.method === "POST") && _.isUndefined(req.body)) {
        req.body = {};
    }
    next();
});

// Routes
// User
server.get('/v1/users/', passport.authenticate(['basic', 'bearer'], {session: false}), userHandlers.index);
server.get('/v1/user/login', passport.authenticate(['basic', 'bearer'], {session: false}), userHandlers.view);
server.post('/v1/user/', userHandlers.login);
server.post('/v1/user/create/', userHandlers.createUser);
server.del('/v1/user/delete/:id', passport.authenticate(['basic', 'bearer'], {session: false}), userHandlers.del);

// List
server.get('/v1/lists/', passport.authenticate(['basic', 'bearer'], {session: false}), listHandlers.index);
server.get('/v1/list/:listId', passport.authenticate(['basic', 'bearer'], {session: false}), listHandlers.view);
server.post('/v1/list/create', passport.authenticate(['basic', 'bearer'], {session: false}), listHandlers.createList);
server.del('/v1/list/:listId', passport.authenticate(['basic', 'bearer'], {session: false}), listHandlers.del);

// Item
server.post('/v1/list/:listId/item/:itemId/update', passport.authenticate(['basic', 'bearer'], {session: false}), itemHandlers.updateItem);
server.post('/v1/list/:listId/item/add', passport.authenticate(['basic', 'bearer'], {session: false}), itemHandlers.addItem);
server.post('/v1/list/:listId/item/:itemId/done', passport.authenticate(['basic', 'bearer'], {session: false}), itemHandlers.moveItem);
server.del('/v1/list/:listId/item/:itemId', passport.authenticate(['basic', 'bearer'], {session: false}), itemHandlers.deleteItem);

sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully');
    // use .sync{ force: true } to drop the db and make a new db from the schema
    sequelize.sync().then(function () {
    // sequelize.sync({force: true}).then(function () {
        server.listen(config.port, function () {
            console.log(' --- Listening to %s --- ', server.url);
        });
    });
}).catch(function (err) {
    console.log('Unable to connect to db: ', err);
});

server.db = {};
server.db.sequelize = sequelize;
server.db.models = models;
module.exports = server;
