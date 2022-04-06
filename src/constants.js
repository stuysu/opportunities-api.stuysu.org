import path from "path";

const sqlitePath = path.resolve(__dirname, "app.db");

export const SEQUELIZE_URL =
	process.env.SEQUELIZE_URL ||
	process.env.DATABASE_URL ||
	`sqlite::${sqlitePath}`
