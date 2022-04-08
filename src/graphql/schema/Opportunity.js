import {gql} from "apollo-server-express";

export default gql`
	type Day {
		id: Integer!
		title: String!
		description: String!
	}
`;