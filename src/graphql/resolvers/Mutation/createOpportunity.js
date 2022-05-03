import { ForbiddenError, UserInputError } from "apollo-server-core";

export default async (
    _,
    { 
        title, 
        description,
        categories,
        eligibilities,
        date,
        location,
        cost,
        appDeadline,
        link
    },
    { 
        models: {
            opportunities,
            categories: Categories,
            eligibilities: Eligibilities,
            oppCategories,
            oppEligibilities
        } 
    }
) => {

    const numExistingOpp = await opportunities.count({
        where: {
            title: title
        }
    });
    if (numExistingOpp > 0) {
        throw new ForbiddenError(
            'You cannot submit a duplicate opportunity.'
        );
    }

    // Create categories for the opportunity
    const getCategories = await Categories.findAll({
        where: {
            id: categories
        }
    });
    categories = getCategories.map(category => category.id);

    const getEligibilities = await Eligibilities.findAll({
        where: {
            id: eligibilities
        }
    });
    eligibilities = getEligibilities.map(eligibility => eligibility.id);

    const opp = await opportunities.create({
        title, 
        description,
        date,
        location,
        cost,
        appDeadline,
        link
    });

    for (let i = 0; i < categories.length; i++) {
        await oppCategories.create({
            opportunityId: opp.id,
            categoryId: categories[i]
        });
    }
    for (let i = 0; i < eligibilities.length; i++) {
        await oppEligibilities.create({
            opportunityId: opp.id,
            eligibilityId: eligibilities[i]
        });
    }

    return opp;
}