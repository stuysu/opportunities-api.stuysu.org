import {gql} from "apollo-server-express"

export default gql`
	type Mutation {
		echo(str: String!): String!
		editOpportunity(
			id: Int!, 
			title: String, 
			description: String,
			categories: [Int],
			date: String,
			location: String,
			cost: Int,
			appDeadline: Date,
			link: String
		): Opportunity!
		createOpportunity(
			title: String!, 
			description: String!,
			categories: [Int],
			date: String,
			location: String,
			cost: Int,
			appDeadline: Date,
			link: String
		): Opportunity!
		deleteOpportunity(id: Int!): Boolean!
	}
`;
