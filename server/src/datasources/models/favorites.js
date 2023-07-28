// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Favorites = mongoose.model("Favourites", {
  user: String,
  type: String,
  item: String
});

export { Favorites };
