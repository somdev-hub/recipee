// const mongoose = require("mongoose");
import mongoose from "mongoose";

const database = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
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
