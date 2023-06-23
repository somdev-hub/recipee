const mongoose = require("mongoose");

// const Nutrients = mongoose.model("Nutrients", {
//   name: String,
//   value: String
// });

const Nutrients = mongoose.model("Nutrients", {
  dishName: String,
  nutrients: [{ name: String, value: Number }]
});

const Recipees = mongoose.model("Recipees", {
  name: String,
  image: String,
  description: String,
  tags: [String],
  ingredients: [String],
  ingredientsAmount: [Number]
});

// const Recipees = {
//   name: String,
//   image: String,
//   description: String,
//   tags: [String],
//   ingredients: [String],
//   ingredientsAmount: [Number]
// };

const Dishes = mongoose.model("Dishes", {
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  weight: Number,
  // nutrients: [Nutrients],
  // recipee: Recipees,
  likes: Number
});

module.exports = { Dishes, Nutrients, Recipees };
