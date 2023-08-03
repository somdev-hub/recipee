/**
 * @module src/datasources/models/recipees
 * @filename recipees.js
 * @namespace Recipees
 * @fileoverview Recipees model
 * @description This file defines the recipees model
 */

import mongoose from "mongoose";

export const Recipees = mongoose.model("recipees", {
  name: String,
  author: String,
  authorId: String,
  image: String,
  description: String,
  ingredients: [String],
  likes: Number,
  likedBy: [String],
  nutrients: [{ name: String, quantity: String }],
  nonveg: Boolean,
  category: String,
  tags: [String]
});
