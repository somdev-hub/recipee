const gql = require("graphql-tag");

const typesDefs = gql`
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
    # dishes: Dishes
    # dishes: String
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
    # dishes: [Dishes]
    basketItems: [BasketItems]
    total: Int
  }

  type BasketItems {
    id: ID!
    dish: Dishes
    quantity: Int
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

  type Profile {
    id: ID!
    name: String!
    image: String!
    info: String!
    profileType: String!
    posts: [Posts]
    favorites: [Dishes]
    followers: Int
  }
`;

module.exports = typesDefs;
