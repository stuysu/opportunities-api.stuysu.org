'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class opportunity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    opportunity.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'opportunity',
    });
    return opportunity;
};