"use strict";
import { Model } from "sequelize";
const oppEligibilities = (sequelize, DataTypes) => {
	class oppEligibilities extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			oppEligibilities.belongsTo(models.opportunities);
			oppEligibilities.belongsTo(models.eligibilities);
		}
	}
	oppEligibilities.init(
		{
			opportunityId: DataTypes.INTEGER,
			eligibilityId: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "oppEligibilities"
		}
	);
	return oppEligibilities;
};

export default oppEligibilities;
