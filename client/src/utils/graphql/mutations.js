import { gql } from "@apollo/client";

export const ADD_BASKET = gql`
  mutation Mutation(
    $user: String!
    $addBasketItemId: ID!
    $type: String
    $quantity: Int
  ) {
    addBasketItem(
      user: $user
      id: $addBasketItemId
      type: $type
      quantity: $quantity
    ) {
      code
      success
      message
    }
  }
`;

export const GET_DISHES_BY_ID = gql`
  mutation GetDishById($getDishId: ID!) {
    getDishById(id: $getDishId) {
      id
      name
      price
      sellerId
      image
      category
      weight
      nonveg
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteBasketItem($deleteBasketItemId: ID!) {
    deleteBasketItem(id: $deleteBasketItemId) {
      code
      success
      message
    }
  }
`;

export const SET_FAVORITES = gql`
  mutation AddToFavorites($user: String, $type: String, $item: String) {
    addToFavorites(user: $user, type: $type, item: $item) {
      code
      success
      message
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation Mutation($input: ProfileInput!) {
    addProfile(input: $input) {
      code
      success
      message
      token
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

export const ADD_CATEGORY = gql`
  mutation Mutation($category: CategoryInput!) {
    addCategory(category: $category) {
      code
      success
      message
    }
  }
`;

export const MAKE_PAYMENT = gql`
  mutation MakePayment($user: String!) {
    makePayment(user: $user) {
      code
      success
      message
      redirect
    }
  }
`;

export const ADD_LIKE = gql`
  mutation AddLike($item: String!, $type: String!, $user: String!) {
    addLike(item: $item, type: $type, user: $user) {
      code
      success
      message
    }
  }
`;
