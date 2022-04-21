export default async (root, args, context) => {
    let { category } = args;
    const { models } = context;

    const filterParams = {
        where: {

        },
        include: []
    };
    
    const categoryInclude = {
        model: models.categories
    }

    if (category) {
        categoryInclude.required = true;
        categoryInclude.where = {
            id: category
        };
    }
    filterParams.include.push(categoryInclude);
    return await models.opportunities.findAll(filterParams);
}