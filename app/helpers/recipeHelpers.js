"use strict";

var _ = require('lodash');
var errors = require('../common/errors');

module.exports = function (models, authenticationHelpers) {

    var getRecipies = function getRecipies(){
        return models.Recipe.findAll();
    }

    var upload = function upload(recipeInfo){
        return models.Recipe.create(recipeInfo);
    }

    return {
        getRecipies: getRecipies,
        upload: upload
    };
};
