import { ForbiddenError } from "../../index";

export default async (
	_,
	{ title, description, categories, eligibilities, date, location, cost, appDeadline, link, archived },
	{
		models: {
			opportunities,
			categories: Categories,
			eligibilities: Eligibilities,
			oppCategories,
			oppEligibilities
		},
		facultyRequired
	}
) => {
	facultyRequired();
	const numExistingOpp = await opportunities.count({
		where: {
			title: title
		}
	});
	if (numExistingOpp > 0) {
		throw new ForbiddenError("You cannot submit a duplicate opportunity.");
	}

	const opp = await opportunities.create({
		title,
		description,
		date,
		location,
		cost,
		appDeadline,
		link,
		archived
	});

	// Create categories for the opportunity
	if (Array.isArray(categories) && categories.length > 0) {
		const getCategories = await Categories.findAll({
			where: {
				id: categories
			}
		});
		categories = getCategories.map(category => category.id);
		for (let i = 0; i < categories.length; i++) {
			await oppCategories.create({
				opportunityId: opp.id,
				categoryId: categories[i]
			});
		}
	}
	// Create eligibilities for the opportunity
	if (Array.isArray(eligibilities) && eligibilities.length > 0) {
		const getEligibilities = await Eligibilities.findAll({
			where: {
				id: eligibilities
			}
		});
		eligibilities = getEligibilities.map(eligibility => eligibility.id);
		for (let i = 0; i < eligibilities.length; i++) {
			await oppEligibilities.create({
				opportunityId: opp.id,
				eligibilityId: eligibilities[i]
			});
		}
	}

	return opp;
};
