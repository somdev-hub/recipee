// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Favorites = mongoose.model("Favourites", {
  user: String,
  type: String,
  item: String
});

// const favoriteRecipee = mongoose.model("FavouriteRecipee", {
//   recipee: {
//     name: String,
//     image: String,
//     description: String,
//     tags: [String],
//     ingredients: [String],
//     ingredientsAmount: [Number]
//   }
// });

// module.exports = { favoriteDishes, favoriteRecipee };
export { Favorites };
