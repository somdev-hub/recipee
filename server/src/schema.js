// const gql = require("graphql-tag");
import gql from "graphql-tag";

const typeDefs = gql`
  # type Query {
  #   dishes: [Dishes]
  #   dish(id: ID!): Dishes
  #   catagories: [Catagories]
  #   catagory(id: ID!): Catagories
  #   recipees: [Recipees]
  #   recipee(id: ID!): Recipees
  #   favorites: [Dishes]
  #   favorite(id: ID!): Dishes
  #   posts: [Posts]
  #   post(id: ID!): Posts
  #   profiles: [Profile]
  #   profile(id: ID!): Profile
  # }

  type Query {
    dishes: [Dishes!]!
    nutrients: [Nutrients!]!
    recipees: [Recipees!]!
    basket(user: String!): [Basket!]!
    favouriteDishes: [FavouriteDish!]!
    getProfile(email: String!): Profile!
  }

  type Mutation {
    deleteBasketItem(id: ID!): DeleteBasketItemResponse!
    addBasketItem(user: String!, id: ID!, quantity: Int): AddBasketItemResponse!
    addToFavouriteDish(id: ID!): AddToFavouriteDishResponse!
    addProfile(input: ProfileInput!): AddProfileResponse!
    getLogin(input: LoginDetails!): LoginDetailsResponse!
    # getProfile(email: String!): Profile!
  }

  input LoginDetails {
    email: String!
    password: String!
  }

  type LoginDetailsResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
  }

  type AddImageResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type AddProfileResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type AddToFavouriteDishResponse {
    code: Int!
    success: Boolean!
    message: String!
    dish: Dishes
  }

  type AddBasketItemResponse {
    code: Int!
    success: Boolean!
    message: String!
    basket: Basket
  }

  type DeleteBasketItemResponse {
    code: Int!
    success: Boolean!
    message: String!
    basket: Basket
  }

  type Dishes {
    id: ID!
    name: String
    price: String
    image: String
    description: String
    category: String
    weight: Int
    # nutrients: [Nutrients]
    # recipee: Recipees
    likes: Int
  }

  type Nutrients {
    id: ID!
    dishName: String!
    nutrients: [NutrientsItems]
  }

  type NutrientsItems {
    name: String!
    value: Int!
  }

  type Catagories {
    id: ID!
    name: String!
    image: String!
    description: String!
    tags: [String]
    dishes: [Dishes]
  }

  type Recipees {
    id: ID!
    name: String!
    image: String!
    description: String!
    tags: [String]
    ingredients: [String]
    ingredientsAmount: [Int]
  }

  type Basket {
    id: ID!
    user: String
    basketItem: Dishes
    quantity: Int
    # total: Int
  }

  type FavouriteDish {
    id: ID!
    dish: Dishes
  }

  type FavouriteRecipee {
    id: ID!
    recipee: Recipees
  }

  type Posts {
    id: ID!
    title: String!
    image: String!
    description: String!
    tags: [String]
    likes: Int
    author: String!
    authorImage: String!
    lenght: Int
  }

  scalar Upload

  type Profile {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    image: String
    address: String!
    city: String!
    pin: String!
  }

  input ProfileInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    address: String!
    city: String!
    pin: String!
    image: String
  }
`;

// module.exports = typesDefs;
export { typeDefs };
