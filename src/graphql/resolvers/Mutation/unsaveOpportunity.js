import { ForbiddenError } from "../../index";

export default async (_, { opportunityId, userId }, { models: { userOpps }, user, authenticationRequired }) => {
	console.log("TESTING");
	console.log("USER ID: " + userId);
	console.log("OPP ID: " + opportunityId);

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
	if (numExistingPairs == 0) {
		throw new ForbiddenError("You have not saved this opportunity!");
	}

	await userOpps.destroy({
		where: {
			opportunityId: opportunityId,
			userId: userId
		}
	});

	return true;
};
