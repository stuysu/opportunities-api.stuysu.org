"use strict";
import { Model } from "sequelize";
const oppTags = (sequelize, DataTypes) => {
	class oppTags extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			oppTags.belongsTo(models.opportunities);
			oppTags.belongsTo(models.tags);
		}
	}
	oppTags.init(
		{
			opportunityId: DataTypes.INTEGER,
			tagId: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "oppTags"
		}
	);
	return oppTags;
};

export default oppTags;