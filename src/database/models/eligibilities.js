"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class eligibilities extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			eligibilities.belongsToMany(models.opportunities, {
				through: models.oppEligibilities
			});
		}
	}
	eligibilities.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "eligibilities"
		}
	);
	return eligibilities;
};
