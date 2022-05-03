export default async(root, args, context) => {
    const { models } = context;
    return await models.eligibilities.findAll();
}