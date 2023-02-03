import { ApolloError } from "../../index";

export default async (
    _, 
    { id }, 
    { 
        models: { 
            opportunities,
            oppCategories,
            oppEligibilities
        },
        facultyRequired
    }
) => {
    facultyRequired();
    // Delete all intermediate data associated with the id to clean up tables
    await oppCategories.destroy({
        where: {
            opportunityId: id
        }
    });
    await oppEligibilities.destroy({
        where: {
            opportunityId: id
        }
    });
	
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