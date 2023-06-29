import { gql } from "@apollo/client";

export const ADD_BASKET = gql`
  mutation Mutation(
    $basketUser: String!
    $addBasketItemId: ID!
    $quantity: Int!
  ) {
    addBasketItem(
      user: $basketUser
      id: $addBasketItemId
      quantity: $quantity
    ) {
      code
      success
      message
      basket {
        basketItem {
          name
          price
          image
          description
          category
          weight
          likes
        }
        quantity
      }
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation Mutation($deleteBasketItemId: ID!) {
    deleteBasketItem(id: $deleteBasketItemId) {
      code
      success
      message
      basket {
        basketItem {
          name
          price
          image
          description
          category
          weight
          likes
        }
        quantity
      }
    }
  }
`;

export const SET_FAVOURITE_DISH = gql`
  mutation Mutation($addToFavouriteDishId: ID!) {
    addToFavouriteDish(id: $addToFavouriteDishId) {
      code
      success
      message
      dish {
        name
        price
        image
        description
        category
        weight
        likes
      }
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation Mutation($input: ProfileInput!) {
    addProfile(input: $input) {
      code
      success
      message
    }
  }
`;

export const ADD_IMAGE = gql`
  mutation Mutation($file: Upload!) {
    addImage(file: $file) {
      code
      success
      message
    }
  }
`;

export const GET_LOGIN = gql`
  mutation GetLogin($input: LoginDetails!) {
    getLogin(input: $input) {
      code
      success
      message
      token
    }
  }
`;

export const GET_PROFILE_HEAD = gql`
  mutation GetProfile($email: String!) {
    getProfile(email: $email) {
      id
      firstName
      lastName
      email
      image
    }
  }
`;

export const ADD_RECIPEE = gql`
  mutation Mutation($recipee: RecipeeInput!) {
    addRecipee(recipee: $recipee) {
      code
      success
      message
      # recipee {
      #   author
      #   name
      #   image
      #   catagory
      #   description
      #   tags
      #   ingredients
      #   nutrients {
      #     name
      #     quantity
      #   }
      # }
    }
  }
`;

export const ADD_DISH = gql`
  mutation Mutation($dish: DishInput!) {
    addDish(dish: $dish) {
      code
      success
      message
      # dish {
      #   name
      #   price
      #   image
      #   dishDescription
      #   category
      #   weight
      #   nutrients {
      #     name
      #     quantity
      #   }
      #   tags
      #   nonveg
      # }
    }
  }
`;
