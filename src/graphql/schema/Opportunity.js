import {gql} from "apollo-server-express";

export default gql`
	type Opportunity {
		title: String!
		description: String!
		date: String!
		location: String!
		cost: Int!
		appDeadline: Date!
		link: String!
	}
`;