/**
 * @module src/datasources/models/favorites
 * @filename favorites.js
 * @namespace Favorites
 * @fileoverview Favorites model
 * @description This file defines the favorites model
 */

import mongoose from "mongoose";

const Favorites = mongoose.model("Favourites", {
  user: String,
  type: String,
  item: String
});

export { Favorites };
