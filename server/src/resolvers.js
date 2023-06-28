// const { Dishes, Nutrients, Recipees } = require("./datasources/models/dishes");
// const { Basket } = require("./datasources/models/basket");
// const {
//   favoriteDishes,
//   favoriteRecipee
// } = require("./datasources/models/favourites");
// const { Profile } = require("./datasources/models/profile");
// const path = require("path");
// const fs = require("fs");

import { Dishes, Nutrients, Recipees } from "./datasources/models/dishes.js";
import { Basket } from "./datasources/models/basket.js";
import {
  favoriteDishes,
  favoriteRecipee
} from "./datasources/models/favourites.js";
import { Profile } from "./datasources/models/profile.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { createWriteStream } from "fs";
import { join } from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    dishes: async (parent, args, context, info) => {
      return await Dishes.find({});
      // return "Hello World"
    },
    nutrients: async (parent, args, context, info) => {
      return await Nutrients.find({});
    },
    recipees: async (parent, args, context, info) => {
      return await Recipees.find({});
    },
    basket: async (parent, args, context, info) => {
      return await Basket.find({ user: args.user });
    },
    favouriteDishes: async (parent, args, context, info) => {
      return await favoriteDishes.find({});
    },
    getProfile: async (parent, { email }, context, info) => {
      const user = await Profile.findOne({ email });
      return user;
    }
  },
  Mutation: {
    deleteBasketItem: async (parent, args, context, info) => {
      try {
        const deleted = await Basket.deleteOne({ _id: args.id });
        return {
          code: 200,
          success: true,
          message: "Item deleted",
          basket: await Basket.find()
        };
      } catch {
        return {
          code: 500,
          success: false,
          message: "Internal server error",
          basket: await Basket.find()
        };
      }
    },
    addBasketItem: async (parent, args, context, info) => {
      try {
        const new_basket_item = new Basket({
          user: args.user,
          basketItem: await Dishes.findById(args.id),
          quantity: args.quantity
        });
        const saved = await new_basket_item.save();
        // console.log(await Basket.find());
        const basket = await Basket.find();
        return {
          code: 200,
          success: true,
          message: "Item added",
          basket: basket
        };
      } catch {
        return {
          code: 500,
          success: false,
          message: "Internal server error",
          basket: await Basket.find()
        };
      }
    },
    addToFavouriteDish: async (parent, args, context, info) => {
      try {
        const new_favourite_item = new favoriteDishes({
          dish: await Dishes.findById(args.id)
        });
        const saved = await new_favourite_item.save();
        const dish = await favoriteDishes.find();
        return {
          code: 200,
          success: true,
          message: "Item added",
          dish: dish
        };
      } catch {
        return {
          code: 500,
          success: false,
          message: "Internal server error",
          dish: await favoriteDishes.find()
        };
      }
    },
    addProfile: async (parent, args, context, info) => {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        image,
        address,
        city,
        pin
      } = args.input;
      console.log(args.input);
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const new_profile = new Profile({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          phone,
          image,
          address,
          city,
          pin
        });

        // } else {
        await new_profile.save();

        return {
          code: 200,
          success: true,
          message: "Item added"
          // profile: profile
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
          // profile: await profile.find()
        };
      }
    },
    getLogin: async (parent, { input }, context, info) => {
      const { email, password } = input;

      const user = await Profile.findOne({ email });
      const valid = await bcrypt.compare(password, user.password);
      if (!user || !valid) {
        return {
          code: 401,
          success: false,
          message: "Invalid email or password"
        };
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });

      return {
        code: 200,
        success: true,
        message: "Login successful",
        token
      };
    }
  }
};

// module.exports = { resolvers };
// export { resolvers };
