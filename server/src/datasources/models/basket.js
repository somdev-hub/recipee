const mongoose = require("mongoose");

const Basket = mongoose.model("Basket", {
  basketItem: {
    name: String,
    price: Number,
    image: String,
    description: String,
    category: String,
    weight: Number,
    likes: Number
  },
  quantity: Number
});

module.exports = { Basket };
