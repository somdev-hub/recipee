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

export const SET_FAVORITE_DISH = gql`
  mutation Mutation($addToFavoriteDishId: ID!) {
    addToFavoriteDish(id: $addToFavoriteDishId) {
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

export const ADD_POST = gql`
  mutation AddPost($post: PostInput!) {
    addPost(post: $post) {
      code
      success
      message
      post {
        title
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($comment: CommentsInput!, $postId: ID!) {
    addComment(comment: $comment, postId: $postId) {
      code
      success
      message
    }
  }
`;

export const SEARCH_ITEM = gql`
  mutation SearchItem($search: String!) {
    searchItem(search: $search) {
      code
      success
      message
      searchResult {
        name
        price
        dishDescription
        category
        weight
        tags
        nonveg
        image
        nutrients {
          name
          quantity
        }
      }
    }
  }
`;

export const SEARCH_ARTICLE = gql`
  mutation SearchArticle($search: String!) {
    searchArticle(search: $search) {
      code
      success
      message
      searchResult {
        id
        title
        description
        author
        length
        image
        authorMail
      }
    }
  }
`;
