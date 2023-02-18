"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class userOpps extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			userOpps.belongsTo(models.opportunities);
			userOpps.belongsTo(models.users);
		}
	}
	userOpps.init(
		{
			userId: DataTypes.INTEGER,
			opportunityId: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "userOpps"
		}
	);
	return userOpps;
};
