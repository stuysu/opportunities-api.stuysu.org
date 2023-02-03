import {createComplexityLimitRule} from "graphql-validation-complexity"
import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql/error";

// Apollo Server v3-style error classes for back-compat
export class ApolloError extends GraphQLError {
	constructor(err, code) {
		super(err, {extensions: { code }});
	}
}
export class AuthenticationError extends ApolloError {
	constructor(err) {
		super(err, 'UNAUTHENTICATED');
	}
}
export class ForbiddenError extends ApolloError {
	constructor(err) {
		super(err, 'FORBIDDEN');
	}
}
export class UserInputError extends ApolloError {
	constructor(err) {
		super(err, ApolloServerErrorCode.BAD_USER_INPUT);
	}
}

const ComplexityLimitRule = createComplexityLimitRule(75000, {
	scalarCost: 1,
	objectCost: 5,
	listFactor: 10
});

export const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	validationRules: [ComplexityLimitRule],
	formatError: (formattedError) => {
		if (formattedError.extensions.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR) {
			return {
				...formattedError,
				message: "There was an unknown error on the server. Rest assured it has been reported. Feel free to contact us at it@stuysu.org to provide more information.",
			};
		}

		return formattedError;
	},
});

export default apolloServer;
