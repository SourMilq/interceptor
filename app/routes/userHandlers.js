"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (userHelpers, listHelpers, authenticationHelpers) {

    var index = function index(req, res, next) {
        userHelpers.getUsers().then(function (users) {
            res.json({"users": users});
            next();
        });
    };

    var view = function view(req, res, next) {
        // req.user would have had a value but authentication is turned off. Thus that cb is not
        // hit.
        // TODO: Validate params
        res.json(200, req.user);
        next();
    };

    var createUser = function createUser(req, res, next) {
        validateParams([
            {name: 'first_name', in: req.body, required: true},
            {name: 'last_name', in: req.body, required: true},
            {name: 'email', in: req.body, required: true},
            {name: 'username', in: req.body, required: true},
            {name: 'password', in: req.body, required: true},
        ]).then(function () {
            var userInfo = _.pick(
                req.body,
                'first_name',
                'last_name',
                'email',
                'username',
                'password'
            );
            userHelpers.createUser(userInfo)
                .then(function (user) {
                    listHelpers.createList(user, {
                        "name": "Grocery List",
                        "description": "Default shopping list.",
                    }).then(function(list){
                        user.addList(list);
                        res.json(201, user);
                        next();
                    });
                }).catch(errors.UserExistsError, sendError(httpErrors.ConflictError, next));
        }).catch(errors.ValidationError, sendError(httpErrors.NotFoundError, next));
    };

    var login = function login(req, res, next){
        validateParams([
            {name: 'username', in: req.body, required: true},
            {name: 'password', in: req.body, required: true},
        ]).then(function () {
            userHelpers.getUserByFilter({username: req.body.username})
                .then(function(user){
                    if (authenticationHelpers.isValidPassword(req.body.password, user.password)){
                        res.json(200, user);
                        next();
                    } else {
                        throw new errors.UserNotFoundError(user.name);
                    }
                }).catch(errors.UserNotFoundError, sendError(httpErrors.InvalidCredentialsError, next));
        }).catch(errors.ValidationError, sendError(httpErrors.NotFoundError, next));
    }

    var del = function del(req, res, next) {
        userHelpers.deleteUser(req.params.id)
            .then(function () {
                res.send(204);
                next();
            });
    };

    return {
        index: index,
        view: view,
        login: login,
        createUser: createUser,
        del: del
    };
};
