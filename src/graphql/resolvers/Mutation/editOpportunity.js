export default async (
    _,
    { title, description },
    { models: {opportunities} }
) => {

    const editingOpportunity = await opportunities.findOne({
        where: {
            title
        }
    });
    if (!editingOpportunity) {
        return await opportunities.create({
            title, description
        });
    }

    if (title) editingOpportunity.title = title;
    if (description) editingOpportunity.description = description;
    await editingOpportunity.save();
    return editingOpportunity;
}