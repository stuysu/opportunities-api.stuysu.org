import {gql} from "apollo-server-express";

export default gql`
	type Opportunity {
		id: Int
		title: String!
		description: String!
		categories: [Category]
		eligibilities: [Eligibility]
		date: String
		location: String
		cost: Int
		appDeadline: Date
		link: String
	}
`;