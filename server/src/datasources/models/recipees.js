import mongoose from "mongoose";

export const Recipees = mongoose.model("recipees", {
  name: String,
  author: String,
  image: String,
  description: String,
  ingredients: [String],
  nutrients: [{ name: String, quantity: String }],
  nonveg: Boolean,
  category: String,
  tags: [String],
});
