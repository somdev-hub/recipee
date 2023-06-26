import { gql } from "@apollo/client";

export const GET_FAVORITES = gql`
  query dishes {
    dishes {
      id
      name
      price
      image
      description
      category
      weight
      likes
    }
  }
`;

export const GET_BASKET = gql`
  query dishes {
    basket {
      id
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
