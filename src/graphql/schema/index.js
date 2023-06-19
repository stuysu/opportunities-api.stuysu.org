import { typeDefs as graphqlScalarDefs } from "graphql-scalars";
import Query from "./Query.js";
import Mutation from "./Mutation.js";
import Opportunity from "./Opportunity.js";
import Category from "./Category.js";
import Eligibility from "./Eligibility.js";
import User from "./User.js";

export default [...graphqlScalarDefs, Query, Mutation, Opportunity, Category, Eligibility, User];
