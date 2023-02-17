export default async (root, args, context) => {
	// context.authenticationRequired();

	let { categories, eligibilities, user } = args;
	const { models } = context;
	const { Op } = models.Sequelize;

	const filterParams = {
		where: {},
		include: [
			// [Op.and]: []
		]
	};

	// Add filter for categories
	const categoryInclude = {
		model: models.categories
	};
	if (Array.isArray(categories) && categories.length > 0) {
		categoryInclude.required = true;
		categoryInclude.where = {
			id: categories
		};
	}
	filterParams.include.push(categoryInclude);

	// Add filter for eligibilities
	const eligibilityInclude = {
		model: models.eligibilities
	};
	if (Array.isArray(eligibilities) && eligibilities.length > 0) {
		eligibilityInclude.required = true;
		eligibilityInclude.where = {
			id: eligibilities
		};
	}
	filterParams.include.push(eligibilityInclude);

	// Add filter for users
	const userInclude = {
		model: models.users
	};
	if (user) {
		userInclude.required = true;
		userInclude.where = {
			id: user
		};
	}
	filterParams.include.push(userInclude);

	//console.log(filterParams);
	return await models.opportunities.findAll(filterParams);
};
