import {createComplexityLimitRule} from "graphql-validation-complexity"

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
			err.originalError instanceof ApolloError ||
			err instanceof ValidationError ||
			(err.originalError && err.originalError.message === "Not allowed by CORS");

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
