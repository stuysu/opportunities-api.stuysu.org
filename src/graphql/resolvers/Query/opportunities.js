export default async (root, args, context) => {
    let { categories, eligibilities } = args;
    const { models } = context;
    const { Op } = models.Sequelize;

    const filterParams = {
        where: {

        },
        include: [
            // [Op.and]: []
        
        ]
    };

    // Add filter for categories
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

    // Add filter for eligibilities
    const eligibilityInclude = {
        model: models.eligibilities
    }
    if (eligibilities) {
        eligibilityInclude.required = true;
        eligibilityInclude.where = {
            id: eligibilities
        };
    }
    filterParams.include.push(eligibilityInclude);
    console.log(filterParams);
    return await models.opportunities.findAll(filterParams);
}