// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Basket = mongoose.model("Basket", {
  user: String,
  basketItem: {
    name: String,
    price: Number,
    image: String,
    dishDescription: String,
    category: String,
    weight: String,
    nutrients: [{ name: String, value: String }],
    tags: [String],
    nonveg: Boolean
  },
  quantity: Number
});

// module.exports = { Basket };
export { Basket };
