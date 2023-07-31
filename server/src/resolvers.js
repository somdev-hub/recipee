import { Dishes, Nutrients } from "./datasources/models/dishes.js";
import { Basket } from "./datasources/models/basket.js";
import { Favorites } from "./datasources/models/favorites.js";
import { Profile } from "./datasources/models/profile.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Recipees } from "./datasources/models/recipees.js";
import { Posts } from "./datasources/models/posts.js";
import Category from "./datasources/models/category.js";
import Stripe from "stripe";
import { Orders } from "./datasources/models/orders.js";
import { OrderPlaced } from "./datasources/models/order-placed.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    dishes: async (__, args, _) => {
      return await Dishes.find({});
      // return "Hello World"
    },
    nutrients: async (__, args, _) => {
      return await Nutrients.find({});
    },
    recipees: async (__, args, _) => {
      return await Recipees.find({});
    },
    basket: async (__, args, _) => {
      const user = args.user;
      // console.log(user);
      try {
        const BasketData = await Basket.find({ user });
        // console.log(BasketData);
        const basketItems = BasketData.map(async (item) => {
          if (item.type === "dish") {
            // console.log(await Dishes.findOne({ _id: item.basketItem }));
            return {
              id: item._id,
              dish: await Dishes.findOne({ _id: item.basketItem }),
              quantity: item.quantity
            };
          } else if (item.type === "category") {
            // console.log(item.basketItem);
            return {
              id: item._id,
              dish: await Category.findOne({ _id: item.basketItem }),
              quantity: item.quantity
            };
          } else {
            return {
              id: null,
              dish: null,
              quantity: -99
            };
          }
        });
        // return await Basket.find({ user: args.user });
        return basketItems;
      } catch (error) {
        console.log(error);
        return {
          code: 500,
          id: null,
          dish: null,
          quantity: null
        };
      }
    },
    getFavorites: async (__, args, _) => {
      const user = args.user;
      const FavoritesData = await Favorites.find({ user });
      const FavoritesItems = FavoritesData.map(async (item) => {
        if (item.type === "dish") {
          return {
            id: item._id,
            dish: await Dishes.findOne({ _id: item.item }),
            type: item.type
          };
        } else if (item.type === "category") {
          return {
            id: item._id,
            category: await Category.findOne({ _id: item.item }),
            type: item.type
          };
        } else if (item.type === "recipee") {
          // console.log(item.item);
          // console.log(await Recipees.findOne({ _id: item.item }));
          return {
            id: item._id,
            recipee: await Recipees.findOne({ _id: item.item }),
            type: item.type
          };
        } else if (item.type === "post") {
          return {
            id: item._id,
            posts: await Posts.findOne({ _id: item.item }),
            type: item.type
          };
        }
      });
      return FavoritesItems;
    },
    searchFavorites: async (__, args, _) => {
      const { user, id } = args;
      const data = await Favorites.findOne({ user, item: id });
      if (data) {
        return {
          code: 200,
          success: true,
          message: "Item exists"
        };
      } else {
        return {
          code: 500,
          success: false,
          message: "Item does not exist"
        };
      }
    },
    getProfile: async (__, { email }, _) => {
      const user = await Profile.findOne({ email });
      return user;
    },
    getPostList: async (__, args, _) => {
      return await Posts.find({});
    },
    getPost: async (__, { id }, _) => {
      return await Posts.findOne({ _id: id });
    },
    getDishesByCategory: async (__, { category }, _) => {
      const regex = new RegExp(category, "i");
      return await Dishes.find({ category: regex });
    },
    getDishesByVeg: async (__, { nonveg }, _) => {
      return await Dishes.find({ nonveg: nonveg });
    },

    getDishesBySellerId: async (__, { sellerId }, _) => {
      return await Dishes.find({ sellerId });
    },
    getRecipeesByAuthor: async (__, { author }, _) => {
      return await Recipees.find({ author });
    },
    getPostByAuthorMail: async (__, { authorMail }, _) => {
      return await Posts.find({ authorMail });
    },
    getRecipeesByCategory: async (__, { category }, _) => {
      const regex = new RegExp(category, "i");
      return await Recipees.find({ category: regex });
    },
    getRecipeesByVeg: async (__, { nonveg }, _) => {
      return await Recipees.find({ nonveg: nonveg });
    },
    getCategories: async (__, args, _) => {
      return await Category.find({});
    },
    getCategoriesByVeg: async (__, { isNonVeg }, _) => {
      // console.log(nonveg);
      return await Category.find({ isNonVeg });
    },
    getCategoriesByCategory: async (__, { category }, _) => {
      const regex = new RegExp(category, "i");
      return await Category.find({ category: regex });
    },
    getCategoriesBySellerId: async (__, { sellerId }, _) => {
      return await Category.find({ sellerId });
    },
    getClientSecret: async (__, { amount, currency }, _) => {
      const paymentIntent = await stripe.paymentIntents.create(
        {
          amount,
          currency
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY
        }
      );
      return paymentIntent.client_secret;
    },
    onPaymentSuccess: async (__, { user, invoice, date, refNumber }, _) => {
      // console.log(user);
      // console.log(date, refNumber);
      const basketItems = await Basket.find({ user });
      const items = basketItems.map(({ user, ...rest }) => rest);
      // console.log(items);
      if (basketItems) {
        try {
          const addOrders = new Orders({
            user,
            basketItems: items,
            invoice,
            date,
            _id: refNumber
          });
          const saved = await Orders.find({ refNumber: refNumber });
          // console.log(saved);
          if (saved.length === 0) {
            await addOrders.save();
            await Basket.deleteMany({ user });
            return {
              code: 200,
              success: true,
              message: "Payment successful"
            };
          } else {
            return {
              code: 500,
              success: false,
              message: "Payment already done"
            };
          }
        } catch (error) {
          return {
            code: 500,
            success: false,
            message: error
          };
        }
      }
    },
    getOrders: async (__, { user }, _) => {
      try {
        const orders = await Orders.find({ user });
        const finalOrder = orders.map((order) => {
          // console.log(order.date);
          const date = new Date(order.date);
          // console.log(date.toLocaleDateString());
          return {
            date: date.toLocaleDateString(),
            invoice: order.invoice,
            basketItems: order.basketItems.map(async (item) => {
              if (item.type === "dish") {
                return {
                  id: item._id,
                  dish: await Dishes.findOne({ _id: item.basketItem }),
                  quantity: item.quantity
                };
              } else if (item.type === "category") {
                return {
                  id: item._id,
                  dish: await Category.findOne({ _id: item.basketItem }),
                  quantity: item.quantity
                };
              }
            })
          };
        });
        return {
          code: 200,
          success: true,
          message: "Orders fetched",
          orders: finalOrder
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
        };
      }
    },
    setOrderPlaced: async (__, args, _) => {
      const { customerEmail, orderId, orderStatus, orderDate } = args;
      console.log(args);
      const items = await Basket.find({ user: customerEmail });
      // console.log(items);
      try {
        items.forEach(async (item) => {
          let name;
          let sellerId;
          if (item.type === "dish") {
            const dish = await Dishes.findOne({ _id: item.basketItem });
            // console.log(dish.name);
            name = dish.name;
            sellerId = dish.sellerId;
          } else if (item.type === "category") {
            const category = await Category.findOne({ _id: item.basketItem });
            // console.log(category.name);
            name = category.name;
            sellerId = category.sellerId;
          }

          // console.log(name, sellerId);
          if (name && sellerId) {
            if (
              await OrderPlaced.findOne({
                orderId,
                restaurantId: sellerId,
                customerEmail
              })
            ) {
              await OrderPlaced.findOneAndUpdate(
                { orderId },
                {
                  $push: {
                    orderItems: { name: name, quantity: item.quantity }
                  }
                }
              );
            } else {
              const orderPlaced = new OrderPlaced({
                restaurantId: sellerId,
                customerEmail,
                orderId,
                orderStatus,
                orderDate,
                orderItems: [
                  {
                    name: name,
                    quantity: item.quantity
                  }
                ]
              });
              try {
                await orderPlaced.save();
              } catch (error) {
                console.log(error);
              }
            }
          }
        });
        return {
          code: 200,
          success: true,
          message: "Order placed"
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
        };
      }
    },
    getOrdersPlaced: async (__, { restaurantId }, _) => {
      // console.log(restaurantId);
      const date = await OrderPlaced.find({ restaurantId })[0];
      console.log(new Date(date?.orderDate).toLocaleDateString());
      return await OrderPlaced.find({ restaurantId });
    }
  },

  Mutation: {
    getDishById: async (__, { id }, _) => {
      return await Dishes.findOne({ _id: id });
    },
    deleteBasketItem: async (__, args, _) => {
      // console.log(args.id);
      try {
        await Basket.deleteOne({ _id: args.id });
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
    addBasketItem: async (__, args, _) => {
      try {
        const new_basket_item = new Basket({
          user: args.user,
          basketItem: args.id,
          type: args.type,
          quantity: args.quantity
        });
        await new_basket_item.save();
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

    addToFavorites: async (__, args, _) => {
      const { user, item, type } = args;
      try {
        const new_favorite_item = new Favorites({
          user,
          item,
          type
        });
        if (await Favorites.findOne({ user, item, type })) {
          await Favorites.deleteOne({ user, item, type });
          return {
            code: 200,
            success: true,
            message: "Item removed"
          };
        } else {
          await new_favorite_item.save();
          return {
            code: 200,
            success: true,
            message: "Item added"
          };
        }
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
          // favorites: await Favorites.find({ user })
        };
      }
    },
    addLike: async (__, args, _) => {
      const { item, type, user } = args;
      if (type === "recipee") {
        const present = await Recipees.findOne({ _id: item });
        let mark = false;
        present.likedBy.forEach((element) => {
          if (element === user) {
            mark = true;
          }
        });
        if (mark) {
          try {
            await Recipees.findOneAndUpdate(
              { _id: item },
              { $inc: { likes: -1 }, $pull: { likedBy: user } },
              { new: true }
            );
            return {
              code: 200,
              success: true,
              message: "unliked"
            };
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            await Recipees.findOneAndUpdate(
              { _id: item },
              { $inc: { likes: 1 }, $push: { likedBy: user } },
              { new: true }
            );
            return {
              code: 200,
              success: true,
              message: "liked"
            };
          } catch (error) {
            console.log(error);
            return {
              code: 500,
              success: false,
              message: error
            };
          }
        }
      }
    },
    addProfile: async (__, args, _) => {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        image,
        address,
        city,
        pin,
        client
      } = args.input;
      // console.log(args.input);
      const already = await Profile.findOne({ email });
      if (already) {
        return {
          code: 500,
          success: false,
          message: "Email already exists"
          // profile: await profile.find()
        };
      }
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
          pin,
          client
        });

        await new_profile.save();
        const token = jwt.sign(
          { userId: new_profile.id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return {
          code: 200,
          success: true,
          message: "Item added",
          token: token
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
    getLogin: async (__, { input }, _) => {
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
    addRecipee: async (__, args, _) => {
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
        likes: 0,
        likedBy: [],
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
    addDish: async (__, args, _) => {
      const {
        name,
        dishDescription,
        price,
        image,
        weight,
        nutrients,
        nonveg,
        sellerId,
        calories,
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
        sellerId,
        calories,
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
    addPost: async (__, args, _) => {
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
      // console.log(args.post);
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
    addComment: async (__, args, _) => {
      const { user, userMail, comment } = args.comment;
      // console.log(args.comment);
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
    searchItem: async (__, args, _) => {
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
    searchArticle: async (__, args, _) => {
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
    },
    addCategory: async (__, args, _) => {
      const {
        name,
        image,
        category,
        description,
        sellerId,
        price,
        weight,
        nutrients,
        isNonVeg,
        dishes,
        calories,
        ingredients,
        tags
      } = args.category;
      // console.log(args.category);
      const new_category = new Category({
        name,
        image,
        category,
        description,
        sellerId,
        price,
        weight,
        nutrients,
        isNonVeg,
        dishes,
        calories,
        ingredients,
        tags
      });
      try {
        await new_category.save();
        return {
          code: 200,
          success: true,
          message: "Category added",
          category: await Category.find()
        };
      } catch {
        return {
          code: 500,
          success: false,
          message: error
        };
      }
    },
    makePayment: async (__, args, _) => {
      const { user } = args;
      const basketItems = await Basket.find({ user });
      const taxRates = await stripe.taxRates.create(
        {
          display_name: "GST",
          description: "GST",
          jurisdiction: "IN",
          percentage: 5,
          inclusive: false
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY
        }
      );
      const lineItems = await Promise.all(
        basketItems.map(async (item) => {
          if (item.type === "dish") {
            const dish = await Dishes.findOne({ _id: item.basketItem });
            const price = parseInt(dish.price);
            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: dish.name
                },
                unit_amount: parseInt(price) * 100
              },
              quantity: item.quantity,
              tax_rates: [taxRates.id]
            };
          } else if (item.type === "category") {
            const category = await Category.findOne({ _id: item.basketItem });
            const price = parseInt(category.price);
            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: category.name
                },
                unit_amount: parseInt(price) * 100
              },
              quantity: item.quantity,
              tax_rates: [taxRates.id]
            };
          }
        })
      );

      const paymentIntent = await stripe.paymentIntents.create(
        {
          amount: lineItems.reduce(
            (acc, item) => acc + item.price_data.unit_amount * item.quantity,
            0
          ),
          currency: "inr"
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY
        }
      );

      const referenceNumber = paymentIntent.id;
      const paymentDateTime = new Date(paymentIntent.created * 1000);
      const amount = (paymentIntent.amount / 100)+(0.05*(paymentIntent.amount / 100));
      // const successUrl = `http://localhost:3000/success?refNumber=${referenceNumber}&paymentDate=${paymentDateTime.toLocaleDateString()}&paymentTime=${paymentDateTime.toLocaleTimeString()}&amount=${amount}`;
      const successUrl = `https://recipee-client.onrender.com/success?refNumber=${referenceNumber}&paymentDate=${paymentDateTime.toLocaleDateString()}&paymentTime=${paymentDateTime.toLocaleTimeString()}&amount=${amount}`;

      try {
        const session = await stripe.checkout.sessions.create(
          {
            line_items: lineItems,

            mode: "payment",
            success_url: successUrl,
            cancel_url: "https://recipee-client.onrender.com/cancel"
          },
          {
            apiKey: process.env.STRIPE_SECRET_KEY
          }
        );

        return {
          code: 200,
          success: true,
          message: "Payment successful",
          redirect: session.url
        };
      } catch (error) {
        console.log(error);
        return {
          code: 500,
          success: false,
          message: error
        };
      }
    },
    deleteAccount: async (__, args, _) => {
      const { email, password } = args;
      const user = await Profile.findOne({ email });
      const valid = await bcrypt.compare(password, user.password);
      if (!user || !valid) {
        return {
          code: 401,
          success: false,
          message: "Invalid email or password"
        };
      }
      try {
        await Profile.deleteOne({ email });
        await Basket.deleteMany({ user: email });
        await Orders.deleteMany({ user: email });
        await Dishes.deleteMany({ sellerId: email });
        await Category.deleteMany({ sellerId: email });
        await Posts.deleteMany({ author: email });
        await Recipees.deleteMany({ author: email });
        await OrderPlaced.deleteMany({ customerEmail: email });
        await Favorites.deleteMany({ user: email });
        return {
          code: 200,
          success: true,
          message: "Account deleted"
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error
        };
      }
    },
    deleteContent: async (__, args, _) => {
      const { email, password } = args;
      const user = await Profile.findOne({ email });
      const valid = await bcrypt.compare(password, user.password);
      if (!user || !valid) {
        return {
          code: 401,
          success: false,
          message: "Invalid email or password"
        };
      }
      try {
        await Basket.deleteMany({ user: email });
        await Orders.deleteMany({ user: email });
        await Dishes.deleteMany({ sellerId: email });
        await Category.deleteMany({ sellerId: email });
        await Posts.deleteMany({ author: email });
        await Recipees.deleteMany({ author: email });
        await OrderPlaced.deleteMany({ customerEmail: email });
        await Favorites.deleteMany({ user: email });
        return {
          code: 200,
          success: true,
          message: "Content deleted"
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
