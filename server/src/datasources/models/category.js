/**
 * @module src/datasources/models/category
 * @filename category.js
 * @namespace Category
 * @fileoverview Category model
 * @description This file defines the category model
 */

import mongoose from "mongoose";

const Category = mongoose.model("Category", {
  name: String,
  description: String,
  category: String,
  image: String,
  ingredients: [],
  tags: [],
  isNonVeg: Boolean,
  dishes: [
    {
      name: String,
      price: String,
      image: String
    }
  ],
  nutrients: [
    {
      name: String,
      quantity: String
    }
  ],
  price: String,
  weight: String,
  calories: String,
  sellerId: String
});

export default Category;
