export default async (
    _,
    { id },
    { models: { opportunities, categories, eligibilities }, authenticationRequired }
) => {

	authenticationRequired();

    return await opportunities.findOne({
        where: {
            id
        },
        include: [{ model: categories }, { model: eligibilities }]
    })
}
