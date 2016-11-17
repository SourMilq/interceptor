"use strict";

var _ = require('lodash');
var errors = require('../common/errors');

module.exports = function (models, authenticationHelpers) {

    var upload = function upload(recipeInfo){
        return models.Recipe.create(recipeInfo);
    }

    return {
        upload: upload
    };
};
