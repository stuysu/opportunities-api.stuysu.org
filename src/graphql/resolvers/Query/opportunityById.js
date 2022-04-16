export default async (
    _,
    { id },
    { models: { opportunities } }
) => {

    return await opportunities.findOne({
        where: {
            id
        }
    })
}