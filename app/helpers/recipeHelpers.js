"use strict";

var _ = require('lodash');
var errors = require('../common/errors');

module.exports = function (models, authenticationHelpers) {

    var getRecipes = function getRecipes(options){
        return models.Recipe.findAll(options || {});
    };

    var getRecipeById = function getRecipeById(recipeId){
        return models.Recipe.findAll({where: {id: recipeId}}).then(function(recipes){
            return recipes[0];
        });
    };

    var upload = function upload(recipeInfo){
        return models.Recipe.create(recipeInfo);
    };

    var getIngredients = function getIngredients(recipeId){
        return getRecipeById(recipeId).then(function(recipe){
            if (recipe === null){
                return {"ingredients": []};
            } else {
                console.log("INGRE: ", recipe);
                return JSON.parse(recipe.extendedIngredients);
            }
        });
    };

    return {
        getRecipes: getRecipes,
        getIngredients: getIngredients,
        getRecipeById: getRecipeById,
        upload: upload
    };
};
