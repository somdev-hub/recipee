import { gql } from "@apollo/client";

export const GET_DISHES = gql`
  query Query {
    dishes {
      id
      name
      price
      image
      dishDescription
      category
      weight
      nutrients {
        name
        quantity
      }
      tags
      nonveg
    }
  }
`;

export const GET_RECIPEES = gql`
  query GetRecipees {
    recipees {
      id
      author
      name
      image
      likes
      likedBy
      category
      description
      tags
      ingredients
      nutrients {
        name
        quantity
      }
    }
  }
`;

export const GET_BASKET = gql`
  query Query($user: String!) {
    basket(user: $user) {
      dish {
        id
        name
        price
        sellerId
        image
        category
        weight
        # nonveg
      }
      quantity
      id
    }
  }
`;

export const GET_BASKET_HEAD = gql`
  query Basket($user: String!) {
    basket(user: $user) {
      id
      dish {
        name
        price
      }
      quantity
    }
  }
`;

export const GET_FAVORITES = gql`
  query GetFavorites($user: String!) {
    getFavorites(user: $user) {
      id
      dish {
        id
        name
        price
        sellerId
        image
      }
      recipee {
        id
        author
        name
        image
      }
      category {
        id
        name
        tags
        price
        image
        dishes {
          name
          image
          price
        }
      }
      post {
        id
        title
        date
        author
        authorMail
        length
        image
        description
      }
      type
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($email: String!) {
    getProfile(email: $email) {
      id
      firstName
      lastName
      email
      password
      phone
      image
      address
      city
      pin
      client
    }
  }
`;

export const GET_PROFILE_HEAD = gql`
  query GetProfile($email: String!) {
    getProfile(email: $email) {
      id
      firstName
      lastName
      email
      image
      client
    }
  }
`;

export const GET_PROFILE_ADDRESS = gql`
  query GetProfile($email: String!) {
    getProfile(email: $email) {
      id
      firstName
      lastName
      email
      image
      address
      city
      pin
    }
  }
`;

export const GET_PROFILE_IMG = gql`
  query GetProfile($email: String!) {
    getProfile(email: $email) {
      id
      image
    }
  }
`;

export const GET_POSTS = gql`
  query GetPostList {
    getPostList {
      id
      title
      image
      description
      author
      length
      authorMail
      date
    }
  }
`;

export const GET_POST = gql`
  query Basket($getPostId: ID!) {
    getPost(id: $getPostId) {
      id
      title
      image
      date
      description
      tags
      likes
      comments {
        user
        userMail
        comment
      }
      author
      authorMail
      length
    }
  }
`;

export const GET_VEG_DISHES = gql`
  query GetDishesByVeg($nonveg: Boolean!) {
    getDishesByVeg(nonveg: $nonveg) {
      id
      name
      price
      image
      dishDescription
      category
      weight
      nutrients {
        name
        quantity
      }
      tags
      nonveg
    }
  }
`;

export const GET_DISHES_BY_SELLERID = gql`
  query GetDishesBySellerId($sellerId: String!) {
    getDishesBySellerId(sellerId: $sellerId) {
      id
      name
      price
      sellerId
      image
      dishDescription
      category
      weight
      nutrients {
        name
        quantity
      }
      tags
      nonveg
    }
  }
`;

export const GET_RECIPEES_BY_AUTHOR = gql`
  query GetRecipeesByAuthor($author: String!) {
    getRecipeesByAuthor(author: $author) {
      id
      author
      name
      image
      category
      description
      tags
      ingredients
      nutrients {
        name
        quantity
      }
    }
  }
`;

export const GET_POSTS_BY_AUTHORMAIL = gql`
  query GetPostByAuthorMail($authorMail: String!) {
    getPostByAuthorMail(authorMail: $authorMail) {
      id
      title
      image
      description
      author
      authorMail
      length
    }
  }
`;

export const GET_DISHES_BY_CATEGORY = gql`
  query GetDishesByCategory($category: String!) {
    getDishesByCategory(category: $category) {
      id
      name
      price
      sellerId
      image
      dishDescription
      category
      weight
      nutrients {
        name
        quantity
      }
      tags
      nonveg
    }
  }
`;

export const GET_RECIPEES_BY_CATEGORY = gql`
  query GetRecipeesByCategory($category: String!) {
    getRecipeesByCategory(category: $category) {
      id
      author
      name
      image
      category
      description
      tags
      likes
      likedBy
      ingredients
      nutrients {
        name
        quantity
      }
    }
  }
`;

export const GET_RECIPEES_BY_VEG = gql`
  query GetRecipeesByVeg($nonveg: Boolean!) {
    getRecipeesByVeg(nonveg: $nonveg) {
      id
      author
      name
      image
      category
      description
      tags
      likes
      likedBy
      ingredients
      nutrients {
        name
        quantity
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Query {
    getCategories {
      id
      name
      image
      ingredients
      description
      tags
      dishes {
        name
        image
        price
      }
      nutrients {
        name
        quantity
      }
      sellerId
      category
      weight
      isNonVeg
      price
    }
  }
`;

export const GET_CATEGORIES_BY_SELLERID = gql`
  query GetCategoriesBySellerId($sellerId: String!) {
    getCategoriesBySellerId(sellerId: $sellerId) {
      id
      name
      image
      dishes {
        name
        image
        price
      }
      sellerId
      price
    }
  }
`;

export const GET_BASKET_NUTRIENTS = gql`
  query Basket($user: String!) {
    basket(user: $user) {
      id
      dish {
        nutrients {
          name
          quantity
        }
      }
    }
  }
`;

export const GET_BASKET_CALORIES = gql`
  query Basket($user: String!) {
    basket(user: $user) {
      dish {
        calories
      }
    }
  }
`;

export const GET_CATEGORY_BY_VEG = gql`
  query GetCategoriesByVeg($isNonVeg: Boolean!) {
    getCategoriesByVeg(isNonVeg: $isNonVeg) {
      id
      name
      image
      ingredients
      description
      tags
      dishes {
        name
        image
        price
      }
      nutrients {
        name
        quantity
      }
      sellerId
      category
      weight
      isNonVeg
      price
    }
  }
`;

export const GET_SECRET_KEY = gql`
  query Query($amount: Int!, $currency: String!) {
    getClientSecret(amount: $amount, currency: $currency)
  }
`;

export const ON_PAYMENT_SUCCESS = gql`
  query OnPaymentSuccess(
    $user: String!
    $invoice: String!
    $date: String!
    $refNumber: String!
  ) {
    onPaymentSuccess(
      user: $user
      invoice: $invoice
      date: $date
      refNumber: $refNumber
    ) {
      code
      success
      message
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($user: String!) {
    getOrders(user: $user) {
      orders {
        date
        invoice
        basketItems {
          quantity
          id
          dish {
            name
            price
            image
          }
        }
      }
    }
  }
`;

export const SEARCH_FAVORITES = gql`
  query SearchFavorites($user: String!, $item: String!) {
    searchFavorites(user: $user, id: $item) {
      code
      success
      message
    }
  }
`;

export const SET_ORDER_PLACED = gql`
  query SetOrderPlaced(
    $customerEmail: String!
    $orderId: String!
    $orderDate: String!
    $orderStatus: String!
  ) {
    setOrderPlaced(
      customerEmail: $customerEmail
      orderId: $orderId
      orderDate: $orderDate
      orderStatus: $orderStatus
    ) {
      code
      success
      message
    }
  }
`;

export const GET_ORDER_PLACED = gql`
  query GetOrdersPlaced($restaurantId: String!) {
    getOrdersPlaced(restaurantId: $restaurantId) {
      customerEmail
      orderId
      orderDate
      orderStatus
      orderItems {
        name
        quantity
      }
    }
  }
`;
