"use strict";

var _ = require('lodash');
var errors = require('../common/errors');

module.exports = function (models, authenticationHelpers) {

    var getRecipes = function getRecipes(options){
        return models.Recipe.findAll(options || {});
    }

    var upload = function upload(recipeInfo){
        return models.Recipe.create(recipeInfo);
    }

    return {
        getRecipes: getRecipes,
        upload: upload
    };
};
