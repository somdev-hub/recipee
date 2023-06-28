import { gql } from "@apollo/client";

export const ADD_BASKET = gql`
  mutation Mutation($addBasketItemId: ID!, $quantity: Int!) {
    addBasketItem(id: $addBasketItemId, quantity: $quantity) {
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
