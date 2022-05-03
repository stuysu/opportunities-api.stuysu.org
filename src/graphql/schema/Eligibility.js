import {gql} from "apollo-server-express";

export default gql`
	type Eligibility {
        id: Int
        name: String!
        description: String!
    }
`;