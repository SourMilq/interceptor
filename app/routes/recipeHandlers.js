"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (recipeHelpers, listHelpers, itemHelpers) {

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
        console.log("BODY: ", req.body.extendedIngredients);
        var recipeInfo = {
            "sourceUrl": req.body.sourceUrl,
            "text": req.body.text,
            "cheap": req.body.cheap,
            "vegan": req.body.vegan,
            "cookingMinutes": req.body.cookingMinutes,
            "title": req.body.title,
            "dairyFree": req.body.dairyFree,
            "preparationMinutes": req.body.preparationMinutes,
            "extendedIngredients": JSON.stringify({"ingredients": req.body.extendedIngredients}),
            "vegetarian": req.body.vegetarian,
            "externalId": req.body.id,
            "imageUrl": "https://spoonacular.com/recipeImages/" + req.body.id + "-556x370.jpg"
        }

        recipeHelpers.upload(recipeInfo).then(function(){
            res.json(200);
            next();
        });
    };

    var ingredients = function ingredients(req, res, next){
        var recipeId = req.params.id;

        // get recipeById
        recipeHelpers.getIngredients(recipeId).then(function(ingredients) {
            res.json(ingredients);
            next();
        });
    };

    var add = function add(req, res, next){
        var recipeId = req.params.id;
        recipeHelpers.getIngredients(recipeId).then(function(ingredients) {
            var o = ingredients.ingredients;
            listHelpers.getGroceryList(req.user).then(function(list){
                // TODO: assuming that grocery list exists
                list = list[0];
                for (var i = 0; i < o.length; i++){
                    itemHelpers.createItemForList(list, {
                        name: o[i].name || o[i].originalString,
                        quantity: o[i].amount,
                        price: 0,
                        expiration: ""
                    });
                }

                listHelpers.getGroceryList(req.user).then(function(list){
                    res.json({"list": list[0]});
                    next();
                });
            });
        });
    };

    return {
        index: index,
        view: view,
        add: add,
        ingredients: ingredients,
        upload: upload
    };
};
