"use strict";
import { Model } from "sequelize";
const categories = (sequelize, DataTypes) => {
	class categories extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			categories.belongsToMany(models.opportunities, {
				through: models.oppCategories
			});
		}
	}
	categories.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "categories"
		}
	);
	return categories;
};

export default categories;