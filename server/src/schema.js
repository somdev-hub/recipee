import gql from "graphql-tag";

const typeDefs = gql`
  """
  The graphQL schema defines the basic structure of the data that can be stored in the database. This acts as the rules and regulations for storing, accessing and modifying the data. Any change made through the frontend of the application must be in accordance with the schema.
  """
   ############################### QUERIES ###############################

  type Query {
    dishes: [Dishes!]! #returns the list of dishes
    nutrients: [Nutrients!]! #returns the list of nutrients
    recipees: [Recipees!]! #returns the list of recipees
    basket(user: String!): [BasketOutput!]! #returns the list of items in the basket
    getFavorites(user: String!): [FavoritesOutput!]! #returns the list of items in the favorites
    searchFavorites(user: String!, id: String!): SearchFavOutput! #returns the search result of the item in the favorites
    getProfile(email: String!): Profile! #returns the profile of the user
    getPostList: [Posts] #returns the list of posts
    getPost(id: ID!): Posts #returns the post with the given id
    getDishesByCategory(category: String!): [Dishes] #returns the list of dishes with the given category
    getDishesByVeg(nonveg: Boolean!): [Dishes] #returns the list of dishes with the given veg/nonveg
    getDishesBySellerId(sellerId: String!): [Dishes] #returns the list of dishes with the given sellerId
    getRecipeesByAuthor(author: String!): [Recipees] #returns the list of recipees with the given author
    getPostByAuthorMail(authorMail: String!): [Posts] #returns the list of posts with the given authorMail
    getRecipeesByCategory(category: String!): [Recipees] #returns the list of recipees with the given category
    getRecipeesByVeg(nonveg: Boolean!): [Recipees] #returns the list of recipees with the given veg/nonveg
    getCategories: [Category] #returns the list of categories
    getCategoriesByVeg(isNonVeg: Boolean!): [Category] #returns the list of categories with the given veg/nonveg
    getCategoriesByCategory(category: String!): [Category] #returns the list of categories with the given category
    getCategoriesBySellerId(sellerId: String!): [Category] #returns the list of categories with the given sellerId
    getClientSecret(amount: Int!, currency: String!): String #returns the client secret for the payment
    onPaymentSuccess(
      user: String!
      invoice: String!
      date: String!
      refNumber: String!
    ): PaymentResponse! #returns the payment response
    getOrders(user: String!): OrderResults
    setOrderPlaced(
      customerEmail: String!
      orderId: String!
      orderDate: String!
      orderStatus: String!
    ): OrderPlacedResponse! #returns the order placed response
    getOrdersPlaced(restaurantId: String!): [OrderPlaced] #returns the list of orders placed
  }

  ############################### MUTATIONS ###############################

  type Mutation {
    getDishById(id: ID!): Dishes #returns the dish with the given id
    deleteBasketItem(id: ID!): DeleteBasketItemResponse! #returns the delete basket item response
    addBasketItem(
      user: String!
      id: ID!
      type: String
      quantity: Int
    ): AddBasketItemResponse! #returns the add basket item response
    addToFavorites(
      user: String
      type: String
      item: String
    ): AddToFavoritesResponse! #returns the add to favorites response
    addProfile(input: ProfileInput!): AddProfileResponse! #returns the add profile response
    getLogin(input: LoginDetails!): LoginDetailsResponse! #returns the login details response
    getProfile(email: String!): AddProfileResponse! #returns the profile of the user
    addRecipee(recipee: RecipeeInput!): AddRecipeeResponse! #returns the add recipee response
    addDish(dish: DishInput!): AddDishResponse! #returns the add dish response
    addPost(post: PostInput!): AddPostResponse! #returns the add post response
    addComment(comment: CommentsInput!, postId: ID!): AddCommentResponse! #returns the add comment response
    searchItem(search: String!): searchItemResponse! #returns the search item response
    searchArticle(search: String!): searchArticleResponse! #returns the search article response
    addCategory(category: CategoryInput!): AddCategoryResponse! #returns the add category response
    makePayment(user: String!): PaymentResponse! #returns the payment response
    addLike(item: String!, type: String!, user: String!): AddLikeResponse! #returns the add like response
    deleteAccount(email: String!, password: String): DeleteAccountResponse! #returns the delete account response
    deleteContent(email: String!, password: String): DeleteContentResponse! #returns the delete content response
  }

  ############################### DEFINITIONS ###############################

  type Dishes { # dishes can be added by restaurant owner
    id: ID!
    name: String # name of the dish
    price: String # price of the dish
    sellerId: String! # email id of the restaurant owner
    image: String # image of the dish
    dishDescription: String # description of the dish
    category: String # category of the dish
    weight: String # weight of the dish
    calories: String # how much calories single plate of dish contains
    nutrients: [Nutrients] # list of all the nutrients
    tags: [String] # tags for the dish
    nonveg: Boolean # true if dish is nonveg
  }

  type Nutrients {
    name: String
    quantity: String
  }

  type Recipees { # recipees can be added by restaurant owner or user
    id: ID!
    author: String # email id of the user who added the recipee
    name: String! # name of the recipee
    image: String! # image of the recipee
    category: String # category of the recipee
    description: String! # description of the recipee
    tags: [String] # tags for the recipee
    likes: Int # number of likes for the recipee
    likedBy: [String] # list of users who liked the recipee
    ingredients: [String] # list of ingredients for the recipee
    nutrients: [Nutrients] # list of nutrients for the recipee
  }

  type CategoryDish {
    name: String!
    image: String!
    price: String!
  }

  type Category { # category can be added by restaurant owner
    id: ID!
    name: String! # name of the category
    image: String! # image of the category
    ingredients: [String] # list of ingredients for the category
    description: String! # description of the category
    tags: [String] # tags for the category
    dishes: [CategoryDish] # list of dishes in the category
    nutrients: [Nutrients] # list of nutrients for the category
    sellerId: String! # email id of the restaurant owner
    category: String! # category of the category
    weight: String! # weight of the category
    calories: String! # how much calories single plate of category contains
    isNonVeg: Boolean! # true if category is nonveg
    price: String! # price of the category
  }

  type Basket { # list of items added by the user in the basket
    id: ID!
    user: String # email id of the user
    type: String # type of the item
    basketItem: String # id of the item
    quantity: Int # quantity of the item added in the basket
  }

  type Favorites { # list of items added by the user in the favorites
    id: ID!
    user: String # email id of the user
    type: String # type of the item
    item: String # id of the item
  }

  type Comments { # comments can be added by any user on any post
    user: String! # name the user who added the comment
    userMail: String! # email id of the user who added the comment
    comment: String! # comment added by the user
  }

  type Posts { # posts on the community page can ny added by any user
    id: ID!
    title: String! # title of the post
    image: String! # image of the post
    date: String! # date on which the post was added
    description: String! # article content
    tags: [String] # tags for the post
    likes: Int # number of likes for the post
    comments: [Comments] # list of comments on the post
    author: String! # name of the user who added the post
    authorMail: String! # email id of the user who added the post
    length: String! # length of the post
  }

  type Profile { # profile of the user
    id: ID!
    firstName: String! # first name of the user
    lastName: String! # Surname of the user
    email: String! # email id of the user
    password: String! # password of the user
    phone: String! # phone number of the user
    image: String # image of the user
    address: String! # address of the user
    city: String! # city of the user
    pin: String! # pin code of the user
    client: String! # client of the user
  }

  type Orders { # orders placed by the user
    user: String! # email id of the user
    date: String! # date on which the order was placed
    _id: String! # id of the order
    basketItems: [BasketOutput] # list of items in the order
    invoice: String # invoice of the order
  }

  type OrderPlaced { # total list of all the orders placed which contains all the items of all the users and respective restaurant owners emails
    restaurantId: String! # email id of the restaurant owner
    customerEmail: String! # email id of the user
    orderId: String! # id of the order
    orderDate: String! # date on which the order was placed
    orderStatus: String! # status of the order
    orderItems: [OrderItems] # list of items in the order
  }

  ############################### INPUTS ###############################

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

  input CommentsInput {
    user: String!
    userMail: String!
    comment: String!
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

  ############################### OUTPUTS ###############################

  type OrderItems {
    name: String!
    quantity: Int!
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

  scalar Upload
`;

export { typeDefs };
