/**
 * @filename basket.js
 * @module src/datasources/models/basket
 * @fileoverview Basket model
 * @requires mongoose
 * @description This file defines the basket model
 * 
 */

import mongoose from "mongoose";

const Basket = mongoose.model("Basket", {
  user: String,
  type: String,
  basketItem: String,
  quantity: Number
});

export { Basket };
