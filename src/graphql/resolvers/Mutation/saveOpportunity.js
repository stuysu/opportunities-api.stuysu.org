export default async (_, { opportunityId, userId }, { models: { userOpp } }) => {
	await userOpp.create({
		opportunityId: opportunityId,
		userId: userId
	});

	return true;
};
