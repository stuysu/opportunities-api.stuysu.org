import {resolvers as graphqlScalarResolvers} from "graphql-scalars";
import Query from "./Query"
import Mutation from "./Mutation"

const resolvers = {
	...graphqlScalarResolvers,
	Query,
	Mutation
};

export default resolvers;
