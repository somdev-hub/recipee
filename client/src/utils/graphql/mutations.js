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
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
    $address: String!
    $city: String!
    $pincode: String!
    $image: Upload
  ) {
    addProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phone: $phone
      address: $address
      city: $city
      pincode: $pincode
      image: $image
    ) {
      code
      success
      message
      # profile {
      #   firstName
      #   lastName
      #   email
      #   password
      #   phone
      #   image
      #   address
      #   city
      #   pincode
      # }
    }
  }
`;
