import { ApolloError } from 'apollo-server-errors';

export default async (
    _,
    { 
        id, 
        title, 
        description,
        date,
        location,
        cost,
        appDeadline,
        link
    },
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
    if (date) editingOpportunity.date = date;
    if (location) editingOpportunity.location = location;
    if (appDeadline) editingOpportunity.appDeadline = appDeadline;
    if (link) editingOpportunity.link = link;
    
    await editingOpportunity.save();
    return editingOpportunity;
}