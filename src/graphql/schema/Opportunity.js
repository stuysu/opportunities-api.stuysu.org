import {gql} from "apollo-server-express";

export default gql`
	type Opportunity {
		title: String!
		description: String!
	}
`;