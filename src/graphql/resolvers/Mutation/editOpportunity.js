import { ApolloError } from 'apollo-server-errors';

export default async (
    _,
    { 
        id, 
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
            oppCategories,
            categories: Categories
        } 
    }
) => {

    const editingOpportunity = await opportunities.findOne({
        where: {
            id
        }
    });
    if (!editingOpportunity) {
        throw new ApolloError(
            "There is no opportunity with that id", 
            "OPPORTUNITY_NOT_FOUND"
        )
    }

    if (title) editingOpportunity.title = title;
    if (description) editingOpportunity.description = description;
    if (date) editingOpportunity.date = date;
    if (location) editingOpportunity.location = location;
    if (cost) editingOpportunity.cost = cost;
    if (appDeadline) editingOpportunity.appDeadline = appDeadline;
    if (link) editingOpportunity.link = link;

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
    
    await editingOpportunity.save();
    return editingOpportunity;
}