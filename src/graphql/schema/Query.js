import {gql} from "apollo-server-express";

export default gql`
	type Query {
		ping: String!,
		opportunityById(id: Int!): Opportunity
		opportunities(
			categories: [Int],
			eligibilities: [Int]
		): [Opportunity]
	}
`;
