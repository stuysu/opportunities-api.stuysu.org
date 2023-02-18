import {ForbiddenError} from "../../index";

export default async (_, { opportunityId, userId }, { models: { userOpps } }) => {

	const numExistingPairs = await userOpps.count({
		where: {
			userId: userId,
			opportunityId: opportunityId
		}
	});
	if (numExistingPairs > 0) {
		throw new ForbiddenError("You have saved this opportunity already!");
	}

	await userOpps.create({
		opportunityId: opportunityId,
		userId: userId
	});

	return true;
};
