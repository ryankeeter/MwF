const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  },
  async signup(parent, args, ctx, info){
    args.email = args.email.toLowerCase();
    //hash the possword (using the bcrypt package - I'm not saving any passwords)
    //also, this is a one-way hash, I am never un-hashing, only comparing
    const password  = await bcrypt.hash(args.password, 10);
    //create the user in the DB
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        avatar: "https://res.cloudinary.com/creatively-forged/image/upload/v1578887476/MwF_User_Images/fmdkngvq5mbb8rfb4hyy.jpg",
        permissions: { set: ['USER']}
      },
      info
    });
    //create the JWT Token
    const token = jwt.sign({userId: user.Id}, process.env.APP_SECRET);
    //set the token on the response in the cookie
    ctx.response.cookie('token', token, {
      httpOnly:true,
      maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie (nom, nom, nom!)
    });
    //return the user after everything
    return user;
  },
  async createMeme(parent, args, ctx, info){
    const newMeme = await ctx.db.mutation.createMeme({
      data: { ...args}
    }, info);
    return newMeme;
  }
};
module.exports = mutations;
