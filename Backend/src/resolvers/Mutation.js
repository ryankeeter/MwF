const mutations = {
  async createUser(parent, args, ctx, info) {
    const newUser = await ctx.db.mutation.createUser(
      { data: { ...args } },
      info
    );
    return newUser;
  },
  updateUser(parent, args, ctx, info) {
    const updates = { ...args };
    const id = updates.id;
    delete updates.id;
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id
        }
      },
      info
    );
  }
};
module.exports = mutations;
