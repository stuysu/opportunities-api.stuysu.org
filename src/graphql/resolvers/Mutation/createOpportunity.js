export default async (
    _,
    { title, description },
    { models: {opportunities} }
) => {

    return await opportunities.create({
        title, description
    });

}