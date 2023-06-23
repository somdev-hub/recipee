const { Dishes, Nutrients, Recipees } = require("./datasources/models/dishes");

const resolvers = {
  Query: {
    dishes: async (parent, args, context, info) => {
      return await Dishes.find({});
      // return "Hello World"
    },
    nutrients: async (parent, args, context, info) => {
      return await Nutrients.find({});
    },
    recipees: async (parent, args, context, info) => {
      return await Recipees.find({});
    }
  }
};

module.exports = { resolvers };
