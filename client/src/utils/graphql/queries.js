import { gql } from "@apollo/client";

export const GET_FAVORITES = gql`
  query Dishes {
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

export const GET_BASKET = gql`
  query Query($basketUser: String!) {
    basket(user: $basketUser) {
      id
      user
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
`;

export const GET_FAVOURITE_DISHES = gql`
  query Query {
    favouriteDishes {
      id
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

export const GET_PROFILE_HEAD = gql`
  query GetProfile($email: String!) {
    getProfile(email: $email) {
      id
      firstName
      lastName
      email
      image
    }
  }
`;
