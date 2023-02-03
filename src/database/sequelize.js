import { SEQUELIZE_URL } from '../constants';

const logger =
	process.env.SEQUELIZE_LOG === 'advanced'
		? console.log
		: query => console.log(query);

const logging = process.env.SEQUELIZE_LOG ? logger : false;

module.exports = {
	development: {
		url: SEQUELIZE_URL,
		define: {
			charset: 'utf8',
			collate: 'utf8mb4_unicode_ci'
		},
		ssl: true,
		native: true,
		logging,
		dialect: SEQUELIZE_URL.includes('sqlite') ? 'sqlite' : 'mysql'
	},
	production: {
		url: SEQUELIZE_URL,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		define: {
			charset: 'utf8mb4',
			collate: 'utf8mb4_unicode_ci'
		},
		native: true,
		ssl: true,
		logging,
		dialect: 'mysql'
	}
};
