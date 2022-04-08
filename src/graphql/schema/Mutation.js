import {gql} from "apollo-server-express"

export default gql`
	type Mutation {
		echo(str: String!): String!
		
		editOpportunity(title: String, description: String): Opportunity!
	}
`;
