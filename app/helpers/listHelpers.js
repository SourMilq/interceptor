"use strict";

var _ = require('lodash');
var errors = require('../common/errors');
var Promise = require('bluebird');

module.exports = function (models, authenticationHelpers) {

    // Returns lists for the given user
    var getLists = function getLists(user) {
        return user.getLists(function(lists){
            return lists;
        });
    };

    // Gets a list by the id
    var getListById = function getListById(user, listId){
        return user.getLists({
            where: {
                id: listId
            },
            include: [
                { model: models.Item }
            ]
        });
    };

    var getGroceryList = function getGroceryList(user){
        return user.getLists({where: {name: "Grocery List"},
        include: [
            { model: models.Item }
        ]});
    };

    var getFridgeList = function getFridgeList(user){
        return user.getLists({where: {name: "Fridge"},
        include: [
            { model: models.Item }
        ]});
    };

    var createList = function createList(user, listInfo){
        return user.getLists({where: {name: listInfo.name}}).then(function(list){
            if (!_.isEmpty(list)){
                throw new errors.DuplicateListError(listInfo.name);
            }
            return models.List.create({
                name: listInfo.name,
                description: listInfo.description,
            }).then(function(list){
                user.addList(list);
                return list;
            });
        });
    };

    return {
        getLists: getLists,
        getListById: getListById,
        createList: createList,
        getGroceryList: getGroceryList,
        getFridgeList: getFridgeList
    };
};
