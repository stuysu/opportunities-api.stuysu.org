export default async (_, { opportunityId, userId }, { models: { userOpps } }) => {
	await userOpps.create({
		opportunityId: opportunityId,
		userId: userId
	});

	return true;
};
