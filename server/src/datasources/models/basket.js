// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Basket = mongoose.model("Basket", {
  user: String,
  type: String,
  basketItem: String,
  quantity: Number
});

// module.exports = { Basket };
export { Basket };
