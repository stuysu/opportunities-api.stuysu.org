"use strict";
import { Model } from "sequelize";
const users = (sequelize, DataTypes) => {
	class users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			users.hasMany(models.oAuthIds);
			users.belongsToMany(models.opportunities, {
				through: models.userOpps
			});
		}
	}
	users.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			gradYear: DataTypes.INTEGER,
			isFaculty: DataTypes.BOOLEAN,
			active: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: "users"
		}
	);
	return users;
};
export default users;