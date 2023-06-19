"use strict";

import fs from "node:fs";
import path from "node:path";
import { default as sqlite3 } from "npm:sqlite3"; // Sequelize peer dep
import { Sequelize } from "npm:sequelize-typescript@2.1.5";  // DENO FIXES

// Deno fixes
import makeloc from 'https://deno.land/x/dirname@1.1.2/mod.ts'
const { __dirname,  __filename } = makeloc(import.meta)
const basename = path.basename(__filename);
const env = Deno.env.get("NODE_ENV") || "development";
import configs from "../sequelize.js";
const config = configs[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(Deno.env.get(config.use_env_variable), config);
} else {
	//sequelize = new Sequelize(config.database, config.username, config.password, config);
	sequelize = new Sequelize(config.url, config);
	console.log("Database:", config.url);
}

fs.readdirSync(__dirname)
	.filter(file => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
	})
	.forEach(file => {
		const model = import (path.join(__dirname, file)).then((mod) => mod.default(sequelize, Sequelize.DataTypes));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
