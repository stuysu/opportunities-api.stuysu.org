import { ForbiddenError, UserInputError } from "apollo-server-core";

export default async (
    _,
    { 
        title, 
        description,
        categories,
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
            oppCategories
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
    if (!categories.length) {
        throw new UserInputError('You must provide at least one category.', {
            invalidArgs: ['categories']
        });
    }

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

    return opp;
}