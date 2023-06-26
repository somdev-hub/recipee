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
const { Basket } = require("./src/datasources/models/basket");

database();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// const app = express();
// app.get("/db", async (req, res) => {
//   // res.send(Dishes.find({}));
//   // const new_nutrients = new Nutrients({
//   //   dishName: "Meat Omellete",
//   //   nutrients: [
//   //     { name: "protein", value: 100 },
//   //     { name: "fat", value: 100 }
//   //   ]
//   // });

//   // const new_recipee = new Recipees({
//   //   name: "Meat Omellete",
//   //   image:
//   //     "https://drive.google.com/file/d/1-lsqRnBca0rWRnxDfZgSD6PlukLqPLH7/view…",
//   //   description:
//   //     "meat omellete is a very tasty dish and is very healthy it is made of meat and eggs, it is very tasty and is very healthy. Some people like it with bread and some like it with rice. It is a very good dish and is very tasty.",
//   //   tags: ["meat", "eggs"],
//   //   ingredients: ["meat", "eggs"],
//   //   ingredientsAmount: [100, 100]
//   // });

//   // const new_dish = new Dishes({
//   //   name: "Meat Omellete",
//   //   price: 100,
//   //   image:
//   //     "https://drive.google.com/file/d/1-lsqRnBca0rWRnxDfZgSD6PlukLqPLH7/view…",
//   //   description:
//   //     "meat omellete is a very tasty dish and is very healthy it is made of meat and eggs, it is very tasty and is very healthy. Some people like it with bread and some like it with rice. It is a very good dish and is very tasty.",
//   //   category: "Break Fast",
//   //   weight: 100,
//   //   likes: 100
//   // });
//   // const data = await Dishes.save();
//   const new_basket = new Basket({
//     basketItem: {
//       name: "Meat Omellete",
//       price: 100,
//       image:
//         "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWj68H1ghsGYhrs2qwp-R4xnXz_pT8BlM5aHdmaXAyDGPonZWQpzb3tzSHZ3roRii6yW3wAl-lYM6irNrFGWr1PVlgOZVRHN5JNoXwilrP52JhgSz4_WjjRKxl--OsYw1LaEa6ktH9w0KQ1YkOHUd8HV6ZjgiLMepB316kkIkxv4BjnZxqgfw2abv1maaD/s1600/image_3.png",
//       description:
//         "meat omellete is a very tasty dish and is very healthy it is made of meat and eggs, it is very tasty and is very healthy. Some people like it with bread and some like it with rice. It is a very good dish and is very tasty.",
//       category: "Break Fast",
//       weight: 100,
//       likes: 100
//     },
//     quantity: 2
//   });
//   try {
//     // await new_dish.save();
//     // await new_recipee.save();
//     // await new_nutrients.save();
//     await new_basket.save();
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
