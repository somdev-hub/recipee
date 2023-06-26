const { Dishes, Nutrients, Recipees } = require("./datasources/models/dishes");
const { Basket } = require("./datasources/models/basket");
const {
  favoriteDishes,
  favoriteRecipee
} = require("./datasources/models/favourites");
// const multer = require("multer");
const { Profile } = require("./datasources/models/profile");

const resolvers = {
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
      return await Basket.find({});
    },
    favouriteDishes: async (parent, args, context, info) => {
      return await favoriteDishes.find({});
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
        // console.log(await favoriteDishes.find());
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
        pincode
      } = args;
      try {
        const new_profile = new Profile({
          firstName,
          lastName,
          email,
          password,
          phone,
          image,
          address,
          city,
          pincode
        });
        if (image) {
          console.log(image);
          const { createReadStream, fileName, mimetype } = await args.image;
          const stream = createReadStream();
          const buffer = [];
          stream.on("data", (chunk) => buffer.push(chunk));
          stream.on("end", async () => {
            const image = {
              data: Buffer.concat(buffer),
              contentType: mimetype
            };
            new_profile.image = image;
            try {
              await new_profile.save();
            } catch (error) {
              console.log(error);
            }
          });
        } else {
          await new_profile.save();
          // console.log(await profile.find());
        }
        // const profile = await profile.find();
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
    }
  }
};

module.exports = { resolvers };
