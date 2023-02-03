"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class oppCategories extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			oppCategories.belongsTo(models.opportunities);
			oppCategories.belongsTo(models.categories);
		}
	}
	oppCategories.init(
		{
			opportunityId: DataTypes.INTEGER,
			categoryId: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "oppCategories"
		}
	);
	return oppCategories;
};
