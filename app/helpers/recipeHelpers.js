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
                return JSON.parse(recipe.extendedIngredients);
            }
        });
    };

    var haveItems = function haveItems(myItems, needed, percentage){
        var intersecting = _.filter(needed, function(o){
            if(_.indexOf(myItems, o) !== -1){
                return true;
            }
        });

        return (((intersecting.length * 100) / needed.length) >= percentage);
    };

    var getRecipesBasedOnIngredients = function getRecipesBasedOnIngredients(fIng, percentage){
        // fIng - Fridge ingredients
        // rIng - Recipe ingredients
        var result = [];
        fIng = _.map(fIng, function(o){
            if (o.name){
                return o.name;
            }
        });

        // get all recipes
        return getRecipes().then(function(recipes){
            for (var i = 0; i < recipes.length; i++){
                var rIng = JSON.parse(recipes[i].extendedIngredients);
                rIng = _.map(rIng.ingredients, function(o){
                    if (o.name){
                        return o.name;
                    }
                });

                if(haveItems(fIng, rIng, percentage || 100)){ result.push(recipes[i]); }
            }
            return result;
        });
    };

    return {
        getRecipesBasedOnIngredients: getRecipesBasedOnIngredients,
        getRecipes: getRecipes,
        getIngredients: getIngredients,
        getRecipeById: getRecipeById,
        upload: upload
    };
};
