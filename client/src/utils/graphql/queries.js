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
      # nutrients {
      #   name
      #   quantity
      # }
      tags
      nonveg
    }
  }
`;

export const GET_BASKET = gql`
  query Query($user: String!) {
    basket(user: $user) {
      id
      user
      basketItem {
        name
        price
        image
        dishDescription
        category
        weight
        # nutrients {
        #   name
        #   quantity
        # }
        tags
        nonveg
      }
      quantity
    }
  }
`;

export const GET_FAVORITE_DISHES = gql`
  query Query {
    favoriteDishes {
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
