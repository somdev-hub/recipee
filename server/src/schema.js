// const gql = require("graphql-tag");
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    dishes: [Dishes!]!
    nutrients: [Nutrients!]!
    recipees: [Recipees!]!
    basket(user: String!): [BasketOutput!]!
    getFavorites(user: String!): [FavoritesOutput!]!
    searchFavorites(user: String!, id: String!): SearchFavOutput!
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
    getCategories: [Category]
    getCategoriesByVeg(isNonVeg: Boolean!): [Category]
    getCategoriesByCategory(category: String!): [Category]
    getCategoriesBySellerId(sellerId: String!): [Category]
    getClientSecret(amount: Int!, currency: String!): String
    onPaymentSuccess(
      user: String!
      invoice: String!
      date: String!
      refNumber: String!
    ): PaymentResponse!
    getOrders(user: String!): OrderResults
    setOrderPlaced(
      customerEmail: String!
      orderId: String!
      orderDate: String!
      orderStatus: String!
    ): OrderPlacedResponse!
    getOrdersPlaced(restaurantId: String!): [OrderPlaced]
  }

  type Mutation {
    getDishById(id: ID!): Dishes
    deleteBasketItem(id: ID!): DeleteBasketItemResponse!
    addBasketItem(
      user: String!
      id: ID!
      type: String
      quantity: Int
    ): AddBasketItemResponse!
    addToFavorites(
      user: String
      type: String
      item: String
    ): AddToFavoritesResponse!

    addProfile(input: ProfileInput!): AddProfileResponse!
    getLogin(input: LoginDetails!): LoginDetailsResponse!
    getProfile(email: String!): AddProfileResponse!
    addRecipee(recipee: RecipeeInput!): AddRecipeeResponse!
    addDish(dish: DishInput!): AddDishResponse!
    addPost(post: PostInput!): AddPostResponse!
    addComment(comment: CommentsInput!, postId: ID!): AddCommentResponse!
    searchItem(search: String!): searchItemResponse!
    searchArticle(search: String!): searchArticleResponse!
    addCategory(category: CategoryInput!): AddCategoryResponse!
    makePayment(user: String!): PaymentResponse!
    addLike(item: String!, type: String!, user: String!): AddLikeResponse!
    deleteAccount(email: String!, password: String): DeleteAccountResponse!
    deleteContent(email: String!, password: String): DeleteContentResponse!
  }

  type DeleteContentResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type DeleteAccountResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type OrderPlacedResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type AddLikeResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type SearchFavOutput {
    code: Int!
    success: Boolean!
    message: String!
  }

  type OrderData {
    date: String!
    invoice: String!
    basketItems: [BasketItems]
  }

  type BasketItems {
    id: ID!
    dish: Dishes
    quantity: Int
  }

  type OrderResults {
    orders: [OrderData]
  }

  type PaymentResponse {
    code: Int!
    success: Boolean!
    message: String!
    redirect: String
  }

  type AddProfileResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
  }

  type AddCategoryResponse {
    code: Int!
    success: Boolean!
    message: String!
    category: [Category]
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

  input PaymentInput {
    customerEmail: String!
    # itemType: String!
    # itemId: String!
    # quantity: Int!
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

  type AddToFavoritesResponse {
    code: Int!
    success: Boolean!
    message: String!
    # dish: Dishes
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

  type BasketOutput {
    # code: Int!
    id: ID!
    dish: Dishes
    quantity: Int
  }

  type FavoritesOutput {
    id: ID!
    dish: Dishes
    recipee: Recipees
    category: Category
    post: Posts
    type: String
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
    calories: String
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
    calories: String!
    nutrients: [NutrientsInput]
    nonveg: Boolean!
    tags: [String]
  }

  type Nutrients {
    name: String
    quantity: String
  }

  type Recipees {
    id: ID!
    author: String
    name: String!
    image: String!
    category: String
    description: String!
    tags: [String]
    likes: Int
    likedBy: [String]
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
    likes: Int
    ingredients: [String]
    nutrients: [NutrientsInput]
    nonveg: Boolean!
  }

  type CategoryDish {
    name: String!
    image: String!
    price: String!
  }

  type Category {
    id: ID!
    name: String!
    image: String!
    ingredients: [String]
    description: String!
    tags: [String]
    dishes: [CategoryDish]
    nutrients: [Nutrients]
    sellerId: String!
    category: String!
    weight: String!
    calories: String!
    isNonVeg: Boolean!
    price: String!
  }

  input CategoryInput {
    name: String!
    image: String!
    description: String!
    tags: [String]
    ingredients: [String]
    nutrients: [NutrientsInput]
    sellerId: String!
    category: String!
    weight: String!
    isNonVeg: Boolean!
    calories: String!
    price: String!
    dishes: [CategoryDishInput]
  }

  input CategoryDishInput {
    name: String!
    image: String!
    price: String!
  }

  input NutrientsInput {
    name: String!
    quantity: String!
  }

  type Basket {
    id: ID!
    user: String
    type: String
    basketItem: String
    quantity: Int
    # total: Int
  }

  type Favorites {
    id: ID!
    user: String
    type: String
    item: String
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
    client: String!
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
    client: String!
    image: String
  }

  type Orders {
    user: String!
    date: String!
    _id: String!
    basketItems: [BasketOutput]
    invoice: String
  }

  type OrderItems {
    name: String!
    quantity: Int!
  }

  type OrderPlaced {
    restaurantId: String!
    customerEmail: String!
    orderId: String!
    orderDate: String!
    orderStatus: String!
    orderItems: [OrderItems]
  }
`;

// module.exports = typesDefs;
export { typeDefs };
