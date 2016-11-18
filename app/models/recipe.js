"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('recipe', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        sourceUrl: {type: DataTypes.STRING},
        text: {type: DataTypes.TEXT},
        cheap: {type: DataTypes.BOOLEAN},
        vegan: {type: DataTypes.BOOLEAN},
        cookingMinutes: {type: DataTypes.INTEGER},
        title: {type: DataTypes.STRING},
        dairyFree: {type: DataTypes.BOOLEAN},
        preparationMinutes: {type: DataTypes.INTEGER},
        extendedIngredients: {type: DataTypes.TEXT},
        vegetarian: {type: DataTypes.BOOLEAN},
        externalId: {type: DataTypes.INTEGER},
        imageUrl: {type: DataTypes.STRING}
    }, {
        timestamps: true,
        indexes: [
            {fields: ['id'], method: 'BTREE'},
        ]
    });
};
