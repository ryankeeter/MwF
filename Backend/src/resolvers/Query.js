const queries = {
    async users (parent, args, ctx, info) {
        const users = await ctx.db.query.users();
        
        return users;
    }
};

module.exports = queries;