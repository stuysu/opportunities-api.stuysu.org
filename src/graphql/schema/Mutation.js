// GQL string
export default `
	type Mutation {
		echo(str: String!): String!
		editOpportunity(
			id: Int!, 
			title: String, 
			description: String,
			categories: [Int],
			eligibilities: [Int],
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
			eligibilities: [Int],
			date: String,
			location: String,
			cost: Int,
			appDeadline: Date,
			link: String
		): Opportunity!
		deleteOpportunity(id: Int!): Boolean!
		saveOpportunity(
		  opportunityId: Int!,
		  userId: Int!
		): Boolean
		loginWithGoogle(googleOAuthToken: String!): String!
		logout: Boolean
	}
`;
