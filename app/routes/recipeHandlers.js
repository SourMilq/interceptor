"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (recipeHelpers) {

    var index = function index(req, res, next){
        var options = {};
        if (req.query.offset !== undefined){
            options["offset"] = req.query.offset
        }

        if (req.query.limit !== undefined){
            options["limit"] = req.query.limit
        }

        recipeHelpers.getRecipes(options).then(function(recipes){
            res.json({"recipes": recipes});
            next();
        });
    };

    var view = function view (req, res, next){
        res.json({"status": "WIP"});
        next();
    };

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
            "vegetarian": req.body.vegetarian,
            "externalId": req.body.id,
            "imageUrl": "https://spoonacular.com/recipeImages/" + req.body.id + "-556x370.jpg"
        }

        recipeHelpers.upload(recipeInfo).then(function(){
            res.json(200);
            next();
        });
    };

    return {
        index: index,
        view: view,
        upload: upload
    };
};
