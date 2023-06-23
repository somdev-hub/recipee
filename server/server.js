const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
// const mongoose = require("mongoose");
const { resolvers } = require("./src/resolvers");
const typeDefs = require("./src/schema");
const { database } = require("./src/datasources/database");
const gql = require("graphql-tag");
const express = require("express");
const {
  Dishes,
  Nutrients,
  Recipees
} = require("./src/datasources/models/dishes");

database();

// const typeDefs = gql`
//   type Query {
//     dishes: String
//   }
// `;

// const resolvers = {
//   Query: {
//     dishes: (parent, args, context, info) => {
//       return "Hello World";
//     }
//   }
// };

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// const app = express();
// app.get("/db", async (req, res) => {
//   // res.send(Dishes.find({}));
//   const new_nutrients = new Nutrients({
//     dishName: "Meat Omellete",
//     nutrients: [
//       { name: "protein", value: 100 },
//       { name: "fat", value: 100 }
//     ]
//   });

//   const new_recipee = new Recipees({
//     name: "Meat Omellete",
//     image:
//       "https://drive.google.com/file/d/1-lsqRnBca0rWRnxDfZgSD6PlukLqPLH7/view…",
//     description:
//       "meat omellete is a very tasty dish and is very healthy it is made of meat and eggs, it is very tasty and is very healthy. Some people like it with bread and some like it with rice. It is a very good dish and is very tasty.",
//     tags: ["meat", "eggs"],
//     ingredients: ["meat", "eggs"],
//     ingredientsAmount: [100, 100]
//   });

//   const new_dish = new Dishes({
//     name: "Meat Omellete",
//     price: 100,
//     image:
//       "https://drive.google.com/file/d/1-lsqRnBca0rWRnxDfZgSD6PlukLqPLH7/view…",
//     description:
//       "meat omellete is a very tasty dish and is very healthy it is made of meat and eggs, it is very tasty and is very healthy. Some people like it with bread and some like it with rice. It is a very good dish and is very tasty.",
//     category: "Break Fast",
//     weight: 100,
//     likes: 100
//   });
//   // const data = await Dishes.save();
//   try {
//     await new_dish.save();
//     await new_recipee.save();
//     await new_nutrients.save();
//     console.log("saved");
//   } catch (error) {
//     console.log(error);
//   }
//   // console.log(data);
// });

// app.listen(4000, () => console.log("Example app listening on port 4000!"));
startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
