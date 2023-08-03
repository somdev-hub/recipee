/**
 * @module src/datasources/models/dishes
 * @filename dishes.js
 * @namespace Dishes
 * @fileoverview Model for dishes and nutrients
 * @description This file defines the dishes model
 */

import mongoose from "mongoose";

const Dishes = mongoose.model("Dishes", {
  name: String,
  price: Number,
  image: String,
  sellerId: String,
  dishDescription: String,
  category: String,
  calories: String,
  weight: String,
  nutrients: [{ name: String, quantity: String }],
  tags: [String],
  nonveg: Boolean
});

export { Dishes };
