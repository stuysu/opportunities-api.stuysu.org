export default async (
    _,
    { 
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

    return await opportunities.create({
        title, 
        description,
        date,
        location,
        cost,
        appDeadline,
        link
    });

}