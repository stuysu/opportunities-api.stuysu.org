import { ForbiddenError } from "../../index.js";

export default async (_, { opportunityId, userId }, { models: { userOpps }, user, authenticationRequired }) => {
	authenticationRequired();
	if (user.id != userId) {
		throw new ForbiddenError("You must perform this query on your own user!");
	}

	const numExistingPairs = await userOpps.count({
		where: {
			userId: userId,
			opportunityId: opportunityId
		}
	});

	return numExistingPairs > 0;
};
