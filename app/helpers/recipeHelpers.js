"use strict";

var _ = require('lodash');
var errors = require('../common/errors');

module.exports = function (models, authenticationHelpers) {

    var getRecipes = function getRecipes(){
        return models.Recipe.findAll();
    }

    var upload = function upload(recipeInfo){
        return models.Recipe.create(recipeInfo);
    }

    return {
        getRecipes: getRecipes,
        upload: upload
    };
};
