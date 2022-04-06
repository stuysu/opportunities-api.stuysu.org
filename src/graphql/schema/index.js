import {typeDefs as graphqlScalarDefs} from "graphql-scalars";
import Query from "./Query";
import Mutation from "./Mutation";

export default [
	...graphqlScalarDefs,
	Query,
	Mutation
];
