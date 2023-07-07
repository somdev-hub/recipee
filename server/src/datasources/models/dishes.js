// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Nutrients = mongoose.model("Nutrients", {
  dishName: String,
  nutrients: [{ name: String, value: Number }]
});

const Dishes = mongoose.model("Dishes", {
  name: String,
  price: Number,
  image: String,
  sellerId: String,
  dishDescription: String,
  category: String,
  weight: String,
  nutrients: [{ name: String, quantity: String }],
  tags: [String],
  nonveg: Boolean
});

// module.exports = { Dishes, Nutrients, Recipees };
export { Dishes, Nutrients };
