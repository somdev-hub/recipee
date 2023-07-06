import { Dishes, Nutrients } from "./datasources/models/dishes.js";
import { Basket } from "./datasources/models/basket.js";
import {
  favoriteDishes,
  favoriteRecipee
} from "./datasources/models/favorites.js";
import { Profile } from "./datasources/models/profile.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { createWriteStream } from "fs";
import { join } from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Recipees } from "./datasources/models/recipees.js";
import { Posts } from "./datasources/models/posts.js";

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
    favoriteDishes: async (parent, args, context, info) => {
      return await favoriteDishes.find({});
    },
    getProfile: async (parent, { email }, context, info) => {
      const user = await Profile.findOne({ email });
      return user;
    },
    getPostList: async (parent, args, context, info) => {
      return await Posts.find({});
    },
    getPost: async (parent, { id }, context, info) => {
      return await Posts.findOne({ _id: id });
    },
    getDishesByCategory: async (parent, { category }, context, info) => {
      return await Dishes.find({ category: category });
    },
    getDishesByVeg: async (parent, { nonveg }, context, info) => {
      return await Dishes.find({ nonveg: nonveg });
    },
    getDishesBySellerId: async (parent, { sellerId }, context, info) => {
      return await Dishes.find({ sellerId });
    },
    getRecipeesByAuthor: async (parent, { author }, context, info) => {
      return await Recipees.find({ author });
    },
    getPostByAuthorMail: async (parent, { authorMail }, context, info) => {
      return await Posts.find({ authorMail });
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
    addToFavoriteDish: async (parent, args, context, info) => {
      try {
        const new_favorite_item = new favoriteDishes({
          dish: await Dishes.findById(args.id)
        });
        const saved = await new_favorite_item.save();
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
      // console.log(args.input);
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
    },
    addRecipee: async (parent, args, context, info) => {
      const {
        name,
        description,
        image,
        ingredients,
        author,
        nutrients,
        nonveg,
        category,
        tags
      } = args.recipee;
      // console.log(args.recipee);
      const new_recipee = new Recipees({
        name,
        description,
        image,
        ingredients,
        author,
        nutrients,
        nonveg,
        category,
        tags
      });
      try {
        await new_recipee.save();
        return {
          code: 200,
          success: true,
          message: "Recipee added",
          recipee: await Recipees.find()
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
          // recipee: await Recipees.find()
        };
      }
    },
    addDish: async (parent, args, context, info) => {
      const {
        name,
        dishDescription,
        price,
        image,
        weight,
        nutrients,
        nonveg,
        category,
        tags
      } = args.dish;
      // console.log(args.dish);
      const new_dish = new Dishes({
        name,
        dishDescription,
        price,
        image,
        weight,
        nutrients,
        nonveg,
        category,
        tags
      });
      try {
        await new_dish.save();
        return {
          code: 200,
          success: true,
          message: "Dish added",
          dish: await Dishes.find()
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
          // dish: await Dishes.find()
        };
      }
    },
    addPost: async (parent, args, context, info) => {
      const {
        title,
        description,
        image,
        date,
        author,
        authorMail,
        length,
        tags
      } = args.post;
      console.log(args.post);
      const new_post = new Posts({
        title,
        description,
        image,
        author,
        date,
        authorMail,
        length,
        tags
      });
      try {
        new_post.save();
        return {
          code: 200,
          success: true,
          message: "Post added",
          post: await Posts.find()
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
          // post: await Posts.find()
        };
      }
    },
    addComment: async (parent, args, context, info) => {
      const { user, userMail, comment } = args.comment;
      console.log(args.comment);
      const update = { $push: { comments: { user, userMail, comment } } };
      try {
        await Posts.findOneAndUpdate({ _id: args.postId }, update, {
          new: true
        });
        return {
          code: 200,
          success: true,
          message: "Comment added",
          comments: await Posts.find({
            comments: { $elemMatch: { user: user } }
          })
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
        };
      }
    },
    searchItem: async (parent, args, context, info) => {
      const { search } = args;
      // console.log(search);
      try {
        const searchResult = await Dishes.find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } }
          ]
        });
        // console.log(searchResult);
        return {
          code: 200,
          success: true,
          message: "Search result",
          searchResult: searchResult
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
        };
      }
    },
    searchArticle: async (parent, args, context, info) => {
      const { search } = args;
      // console.log(search);
      try {
        const searchResult = await Posts.find({
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } }
          ]
        });
        // console.log(searchResult);
        return {
          code: 200,
          success: true,
          message: "Search result",
          searchResult: searchResult
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
        };
      }
    }
  }
};

// module.exports = { resolvers };
// export { resolvers };
