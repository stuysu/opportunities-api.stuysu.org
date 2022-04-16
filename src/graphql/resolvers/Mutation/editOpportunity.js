import { ApolloError } from 'apollo-server-errors';

export default async (
    _,
    { id, title, description },
    { models: {opportunities} }
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
    await editingOpportunity.save();
    return editingOpportunity;
}