export default async (
    _,
    { id },
    { models: { opportunities }, authenticationRequired }
) => {

	authenticationRequired();

    return await opportunities.findOne({
        where: {
            id
        }
    })
}