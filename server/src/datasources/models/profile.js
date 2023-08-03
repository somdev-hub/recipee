/**
 * @module src/datasources/models/profile
 * @filename profile.js
 * @namespace Profile
 * @fileoverview Profile model
 * @description This file defines the profile model
 */

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

export { Profile };
