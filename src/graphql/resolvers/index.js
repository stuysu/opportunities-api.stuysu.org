import { resolvers as graphqlScalarResolvers } from "graphql-scalars";
import Query from "./Query/index.js";
import Mutation from "./Mutation/index.js";

const resolvers = {
	...graphqlScalarResolvers,
	Query,
	Mutation
};

export default resolvers;
