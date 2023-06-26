const mongoose = require("mongoose");

const favoriteDishes = mongoose.model("FavouriteDishes", {
  dish: {
    name: String,
    price: Number,
    image: String,
    description: String,
    category: String,
    weight: Number,
    likes: Number
  }
});

const favoriteRecipee = mongoose.model("FavouriteRecipee", {
  recipee: {
    name: String,
    image: String,
    description: String,
    tags: [String],
    ingredients: [String],
    ingredientsAmount: [Number]
  }
});

module.exports = { favoriteDishes, favoriteRecipee };
