// GQL string
export default `
	type Query {
		ping: String!,
		opportunityById(id: Int!): Opportunity
		opportunities(
			cost: Int,
			categories: [Int],
			eligibilities: [Int],
			user: Int
		): [Opportunity]
		categories: [Category]
		eligibilities: [Eligibility]
		authenticatedUser: User
		isOpportunitySaved(opportunityId: Int!, userId: Int!): Boolean
	}
`;
