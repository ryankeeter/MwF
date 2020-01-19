const { forwardTo } = require("prisma-binding");

const queries = {
  async users(parent, args, ctx, info) {
    const users = await ctx.db.query.users();

    return users;
  },
  user: forwardTo("db")

  /*async user(parent, args, ctx, info) {
    const where = { where: { id: args.id } };
    const user = await ctx.db.query.user({ where }, `{id, name, email}`);
    return user;
  }*/
};

module.exports = queries;
