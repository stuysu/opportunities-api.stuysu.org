import { ApolloError } from "../../index";

export default async (
	_,
	{ id, title, description, categories, eligibilities, date, location, cost, appDeadline, link, archived },
	{
		models: {
			opportunities,
			oppCategories,
			oppEligibilities,
			categories: Categories,
			eligibilities: Eligibilities
		},
		facultyRequired
	}
) => {
	facultyRequired();

	const editingOpportunity = await opportunities.findOne({
		where: {
			id
		}
	});
	if (!editingOpportunity) {
		throw new ApolloError("There is no opportunity with that id", "OPPORTUNITY_NOT_FOUND");
	}

	if (title) editingOpportunity.title = title;
	if (description) editingOpportunity.description = description;
	if (date) editingOpportunity.date = date;
	if (location) editingOpportunity.location = location;
	if (cost) editingOpportunity.cost = cost;
	if (appDeadline) editingOpportunity.appDeadline = appDeadline;
	if (link) editingOpportunity.link = link;
	if (editingOpportunity.archived !== undefined && editingOpportunity.archived !== null)
		editingOpportunity.archived = archived;

	if (categories) {
		// Delete existing categories
		await oppCategories.destroy({
			where: {
				opportunityId: id
			}
		});

		// Create categories for the opportunity
		const getCategories = await Categories.findAll({
			where: {
				id: categories
			}
		});
		categories = getCategories.map(Category => Category.id);
		for (let i = 0; i < categories.length; i++) {
			await oppCategories.create({
				opportunityId: id,
				categoryId: categories[i]
			});
		}
	}

	if (eligibilities) {
		// Delete existing eligibilities
		await oppEligibilities.destroy({
			where: {
				opportunityId: id
			}
		});

		// Create eligibilities for the opportunity
		const getEligibilities = await Eligibilities.findAll({
			where: {
				id: eligibilities
			}
		});
		eligibilities = getEligibilities.map(Eligibility => Eligibility.id);
		for (let i = 0; i < eligibilities.length; i++) {
			await oppEligibilities.create({
				opportunityId: id,
				eligibilityId: eligibilities[i]
			});
		}
	}

	await editingOpportunity.save();
	return editingOpportunity;
};
