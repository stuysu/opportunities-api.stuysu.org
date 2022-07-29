export default async(root, args, context) => {
	context.authenticationRequired();
    const { models } = context;
    return await models.eligibilities.findAll();
}