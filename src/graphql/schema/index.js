import {typeDefs as graphqlScalarDefs} from "graphql-scalars";
import Query from "./Query";
import Mutation from "./Mutation";
import Opportunity from "./Opportunity";
import Category from "./Category";
import Eligibility from "./Eligibility";
import User from "./User";

export default [
	...graphqlScalarDefs,
	Query,
	Mutation,
	Opportunity,
	Category,
	Eligibility,
	User
];
