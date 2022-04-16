import {gql} from "apollo-server-express"

export default gql`
	type Mutation {
		echo(str: String!): String!
		editOpportunity(id: Int!, title: String, description: String): Opportunity!
		createOpportunity(title: String!, description: String!): Opportunity!
		deleteOpportunity(id: Int!): Boolean!
	}
`;
