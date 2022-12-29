import {createComplexityLimitRule} from "graphql-validation-complexity"

import {verify} from 'jsonwebtoken';

import {PUBLIC_KEY} from '../constants';

import {
	ApolloServer,
	ApolloError,
	ValidationError,
	ForbiddenError,
} from "apollo-server-express"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import typeDefs from "./schema";
import resolvers from "./resolvers";

const models = require("../database");

const ComplexityLimitRule = createComplexityLimitRule(75000, {
	scalarCost: 1,
	objectCost: 5,
	listFactor: 10
});

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req, res }) => {
		
		let user, signedIn;
		
		let jwt;

		if(req.cookies){
			//console.log("has cookies");
			jwt = req.cookies['auth-jwt'];
		}
		
		if(!jwt && req.headers){
			jwt = req.headers['x-access-token'] || req.headers['authorization'];
		}

		//console.log(jwt);

		if(jwt && jwt.startsWith('Bearer ')){
			jwt = jwt.replace('Bearer ', '');
		}
		
		if(jwt){
			try{
				const data = await verify(jwt, PUBLIC_KEY);
				if(data){
					user = await models.users.findOne({
						where: {
							id: data.user.id
						},
					});
					signedIn = Boolean(user);
				}
			} catch (e){
			}
		}
		
		function authenticationRequired() {
			if (!signedIn) {
				throw new ForbiddenError(
					'You must be signed in to perform that query'
				);
			}
		}
		
		/*
		if(user){
			console.log("User " + user.email + " made query");
		}
		*/
		
		const setCookie = (...a) => res.cookie(...a);
		return {
			signedIn,
			user,
			authenticationRequired,
			models,
			setCookie,
		};
	},
	uploads: false,
	introspection: true,
	plugins: [
		ApolloServerPluginLandingPageGraphQLPlayground({
			settings: {
				"request.credentials": "same-origin"
			}
		})
	],
	validationRules: [ComplexityLimitRule],
	formatError: err => {
		const safeError =
			err instanceof ApolloError ||
			err instanceof ValidationError ||
			(err && err.message === "Not allowed by CORS");

		const internalError = err && err.extensions && err.extensions.code && err.extensions.code === "INTERNAL_SERVER_ERROR";

		if (!safeError || internalError) {
			console.log(JSON.stringify(err, null, 2));
			return new Error(
				"There was an unknown error on the server. Rest assured it has been reported. Feel free to contact us at it@stuysu.org to provide more information."
			);
		}

		if (
			process.env.NODE_ENV === "production" && err && err.extensions && err.extensions.exception && err.extensions.exception.stacktrace) {
			delete err.extensions.exception.stacktrace;
		}

		return err;
	}
});

export default apolloServer;
