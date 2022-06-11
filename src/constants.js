import path from 'path';

require('dotenv').config();

const sqlitePath = path.resolve(__dirname, 'app.db');

export const SEQUELIZE_URL =
	process.env.SEQUELIZE_URL ||
	process.env.DATABASE_URL ||
	`sqlite::${sqlitePath}`;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const GOOGLE_LOGIN_CLIENT_ID = "1050067653053-vucndte6832mr9alr7njifidrbgnmrio.apps.googleusercontent.com";

export const SESSION_SECRET = process.env.SESSION_SECRET || "howdy";

export const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const PUBLIC_KEY = process.env.PUBLIC_KEY;
