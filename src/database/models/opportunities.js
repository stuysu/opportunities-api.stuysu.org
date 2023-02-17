"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class opportunities extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			opportunities.belongsToMany(models.categories, {
				through: models.oppCategories
			});
			opportunities.belongsToMany(models.tags, {
				through: models.oppTags
			});
			opportunities.belongsToMany(models.eligibilities, {
				through: models.oppEligibilities
			});
		}
	}
	opportunities.init(
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			date: DataTypes.STRING,
			location: DataTypes.STRING,
			cost: DataTypes.INTEGER,
			appDeadline: DataTypes.DATE,
			link: DataTypes.TEXT,
			archived: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: "opportunities"
		}
	);
	return opportunities;
};
