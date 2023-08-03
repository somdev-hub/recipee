/**
 * @module src/datasources/models/orders
 * @filename orders.js
 * @namespace Orders
 * @fileoverview Orders model
 * @description This file defines the orders model
 */

import mongoose from "mongoose";

export const Orders = mongoose.model("Orders", {
  user: { type: String, required: true },
  date: { type: Date, required: true },
  _id: { type: String, unique: true, required: true, index: true },
  basketItems: { type: Array, required: true },
  invoice: String
});
