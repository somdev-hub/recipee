// const gql = require("graphql-tag");
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    dishes: [Dishes!]!
    nutrients: [Nutrients!]!
    recipees: [Recipees!]!
    basket(user: String!): [Basket!]!
    favoriteDishes: [FavoriteDish!]!
    getProfile(email: String!): Profile!
    getPostList: [Posts]
    getPost(id: ID!): Posts
    getDishesByCategory(category: String!): [Dishes]
    getDishesByVeg(nonveg: Boolean!): [Dishes]
    getDishesBySellerId(sellerId: String!): [Dishes]
    getRecipeesByAuthor(author: String!): [Recipees]
    getPostByAuthorMail(authorMail: String!): [Posts]
    getRecipeesByCategory(category: String!): [Recipees]
    getRecipeesByVeg(nonveg: Boolean!): [Recipees]
  }

  type Mutation {
    deleteBasketItem(id: ID!): DeleteBasketItemResponse!
    addBasketItem(user: String!, id: ID!, quantity: Int): AddBasketItemResponse!
    addToFavoriteDish(id: ID!): AddToFavoriteDishResponse!
    addProfile(input: ProfileInput!): AddProfileResponse!
    getLogin(input: LoginDetails!): LoginDetailsResponse!
    getProfile(email: String!): Profile!
    addRecipee(recipee: RecipeeInput!): AddRecipeeResponse!
    addDish(dish: DishInput!): AddDishResponse!
    addPost(post: PostInput!): AddPostResponse!
    addComment(comment: CommentsInput!, postId: ID!): AddCommentResponse!
    searchItem(search: String!): searchItemResponse!
    searchArticle(search: String!): searchArticleResponse!
  }

  type searchArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    searchResult: [Posts]
  }

  type searchItemResponse {
    code: Int!
    success: Boolean!
    message: String!
    searchResult: [Dishes]
  }

  type AddCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comments: [Comments]
  }

  type AddPostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: [Posts]
  }

  type AddDishResponse {
    code: Int!
    success: Boolean!
    message: String!
    dish: [Dishes]
  }

  type AddRecipeeResponse {
    code: Int!
    success: Boolean!
    message: String!
    recipee: [Recipees]
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

  type AddToFavoriteDishResponse {
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
    sellerId: String!
    image: String
    dishDescription: String
    category: String
    weight: String
    nutrients: [Nutrients]
    tags: [String]
    nonveg: Boolean
  }

  input DishInput {
    name: String!
    sellerId: String!
    price: String!
    image: String!
    dishDescription: String!
    category: String!
    weight: String!
    nutrients: [NutrientsInput]
    nonveg: Boolean!
    tags: [String]
  }

  type Nutrients {
    name: String
    quantity: String
  }

  type Categories {
    id: ID!
    name: String!
    image: String!
    description: String!
    tags: [String]
    dishes: [Dishes]
  }

  type Recipees {
    id: ID!
    author: String
    name: String!
    image: String!
    category: String
    description: String!
    tags: [String]
    ingredients: [String]
    nutrients: [Nutrients]
  }

  input RecipeeInput {
    author: String
    name: String!
    image: String!
    category: String
    description: String!
    tags: [String]
    ingredients: [String]
    nutrients: [NutrientsInput]
    nonveg: Boolean!
  }

  input NutrientsInput {
    name: String!
    quantity: String!
  }

  type Basket {
    id: ID!
    user: String
    basketItem: Dishes
    quantity: Int
    # total: Int
  }

  type FavoriteDish {
    id: ID!
    dish: Dishes
  }

  type FavoriteRecipee {
    id: ID!
    recipee: Recipees
  }

  type Comments {
    user: String!
    userMail: String!
    comment: String!
  }

  input CommentsInput {
    user: String!
    userMail: String!
    comment: String!
  }

  type Posts {
    id: ID!
    title: String!
    image: String!
    date: String!
    description: String!
    tags: [String]
    likes: Int
    comments: [Comments]
    author: String!
    authorMail: String!
    length: String!
  }

  input PostInput {
    title: String!
    image: String!
    date: String!
    description: String!
    tags: [String]
    likes: Int
    comments: [CommentsInput]
    author: String!
    authorMail: String!
    length: String!
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
