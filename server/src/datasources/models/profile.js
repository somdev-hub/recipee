const mongoose = require("mongoose");

const Profile = mongoose.model("Profile", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  image: {
    data: Buffer,
    contentType: String
  },
  address: String,
  city: String,
  pincode: String
});

module.exports = { Profile };
