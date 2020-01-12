const mutations = {
    async createUser (parent, args, ctx, info){
        const newUser =
            await ctx.db.mutation.createUser({data: {...args}}, info);
        return newUser;
    }
};
module.exports = mutations;