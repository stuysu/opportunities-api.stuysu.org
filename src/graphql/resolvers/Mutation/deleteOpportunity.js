import { ApolloError } from 'apollo-server-express';

export default async (
    _, 
    { id }, 
    { 
        models: { 
            opportunities,
            oppCategories,
            categories
        } 
    }
) => {
    // Delete all oppCategory associated with the id to clean up table
    await oppCategories.destroy({
        where: {
            opportunityId: id
        }
    })
	
	const deletingOpportunity = await opportunities.findOne({
        where: { 
            id 
        } 
    });
	if (!deletingOpportunity) {
		throw new ApolloError("There is no opportunity with that ID", 'ID_NOT_FOUND');
	}
	await deletingOpportunity.destroy();
	return true;
};