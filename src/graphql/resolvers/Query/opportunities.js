export default async (root, args, context) => {
    let { categories } = args;
    const { models } = context;

    const filterParams = {
        where: {

        },
        include: []
    };
    
    const categoryInclude = {
        model: models.categories
    }

    if (categories) {
        categoryInclude.required = true;
        categoryInclude.where = {
            id: categories
        };
    }
    filterParams.include.push(categoryInclude);
    return await models.opportunities.findAll(filterParams);
}