export default async (
    _,
    { title, description },
    { models: {opportunity} }
) => {

    const editingOpportunity = await opportunity.findOne({
        where: {
            title
        }
    });

    if (!editingOpportunity) {
        return await opportunity.create({
            title, description
        });
    }

    if (title) editingOpportunity.title = title;
    if (description) editingOpportunity.description = description;
    await editingOpportunity.save();
    return editingOpportunity;
}