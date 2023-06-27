// const mongoose = require("mongoose");
import mongoose from "mongoose";

const database = () => {
  const MONGO_URI =
    "mongodb+srv://recipee_user:bw8gOUiyMzppNeMr@cluster0.fkxax8m.mongodb.net/recipee?retryWrites=true&w=majority";

  try {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log(`Db Connected`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch {
    console.log("Could not connect to database ");
  }
};

// module.exports = { database };
export { database };
