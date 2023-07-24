import mongoose from "mongoose";

export const Orders = mongoose.model("Orders", {
  user: { type: String, required: true },
  date: { type: Date, required: true },
  _id: { type: String, unique: true, required: true, index: true },
  basketItems: { type: Array, required: true },
  invoice: String
});
