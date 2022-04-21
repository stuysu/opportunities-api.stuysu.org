import {typeDefs as graphqlScalarDefs} from "graphql-scalars";
import Query from "./Query";
import Mutation from "./Mutation";
import Opportunity from "./Opportunity";
import Category from "./Category";

export default [
	...graphqlScalarDefs,
	Query,
	Mutation,
	Opportunity,
	Category
];
