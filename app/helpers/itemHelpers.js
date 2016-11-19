"use strict";

var _ = require('lodash');
var errors = require('../common/errors');
var Promise = require('bluebird');

module.exports = function (models, authenticationHelpers) {

    // Creates a single item with the item info
    var createItem = function createItem(itemInfo){
        return models.Item.create(itemInfo);
    };

    var createItemForList = function createItemForList(list, itemInfo){
        return createItem(itemInfo).then(function(item){
            return list.addItem(item);
        });
    };

    var getItemById = function getItemById(list, itemId){
        return list.getItems(
            {
                where: {
                    id: itemId
                }
            }
        );
    }

    var getItemByName = function getItemByName(list, itemName){
        return list.getItems(
            {
                where: {
                    name: itemName
                }
            }
        );
    }

    var deleteItemById = function deleteItemById(list, itemId){
        return getItemById(list, itemId).then(function(item){
            if (item.length > 0){
                return item[0].destroy();
            } else {
                return null;
            }
        });
    }

    return {
        createItem: createItem,
        getItemById: getItemById,
        getItemByName: getItemByName,
        deleteItemById: deleteItemById,
        createItemForList: createItemForList
    };
};
