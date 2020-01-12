const { GraphQLServer } = require("graphql-yoga");

const mutations = require("./resolvers/Mutation");
const queries = require("./resolvers/Query");
const db = require("./db");

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation: mutations,
      Query: queries
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
