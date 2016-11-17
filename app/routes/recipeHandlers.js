"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (recipeHelpers) {

    var index = function index(req, res, next){
        recipeHelpers.getRecipes().then(function(recipes){
            res.json({"recipes": recipes});
            next();
        });
    }

    var upload = function upload(req, res, next){
        var recipeInfo = {
            "sourceUrl": req.body.sourceUrl,
            "text": req.body.text,
            "cheap": req.body.cheap,
            "vegan": req.body.vegan,
            "cookingMinutes": req.body.cookingMinutes,
            "title": req.body.title,
            "dairyFree": req.body.dairyFree,
            "preparationMinutes": req.body.preparationMinutes,
            "extendedIngredients": req.body.extendedIngredients,
            "vegetarian": req.body.vegetarian
        }

        recipeHelpers.upload(recipeInfo).then(function(){
            res.json(200);
            next();
        });
    }

    return {
        index: index,
        upload: upload
    };
};
