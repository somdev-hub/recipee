// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Profile = mongoose.model("Profile", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  image: String,
  address: String,
  city: String,
  pin: String,
  client: String
});

// module.exports = { Profile };
export { Profile };
