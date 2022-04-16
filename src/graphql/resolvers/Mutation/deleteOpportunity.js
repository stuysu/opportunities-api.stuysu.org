import { ApolloError } from 'apollo-server-express';

export default async (
    _, 
    { id }, 
    { models: { opportunities } }
) => {
	
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