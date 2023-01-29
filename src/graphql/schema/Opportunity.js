// GQL string
export default `
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