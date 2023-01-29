import {createComplexityLimitRule} from "graphql-validation-complexity"
import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql/error";

// Apollo Server v3-style error class back-compat
export const ApolloError = (err, code) => {
	return new GraphQLError(err, {extensions: { code }})
}
export const AuthenticationError = (err) => {
	return new GraphQLError(err, {extensions: {code: 'UNAUTHENTICATED'}})
};
export const ForbiddenError = (err) => {
	return new GraphQLError(err, {extensions: {code: 'FORBIDDEN'}})
};
export const UserInputError = (err) => {
	return new GraphQLError(err, {extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}})
};

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
	formatError: (gQLErr, err) => {
		// TODO: rewrite considering https://www.apollographql.com/docs/apollo-server/migration/#error-formatting-changes
		// https://www.apollographql.com/docs/apollo-server/migration/#built-in-error-classes
		const safeError =
			err instanceof GraphQLError ||
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
