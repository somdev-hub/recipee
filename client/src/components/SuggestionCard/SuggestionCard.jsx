import React from "react";
import "./SuggestionCard.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useMutation, useQuery } from "@apollo/client";
import { SET_FAVORITES } from "../../utils/graphql/mutations";
import { SEARCH_FAVORITES } from "../../utils/graphql/queries";

const SuggestionCard = (props) => {
  const [liked, setLiked] = React.useState(false);
  const [addToFavoriteDish] = useMutation(SET_FAVORITES, {
    variables: {
      user: localStorage.getItem("email"),
      type: "dish",
      item: props.id
    }
  });
  const { data: searchFavorite } = useQuery(SEARCH_FAVORITES, {
    variables: {
      user: localStorage.getItem("email"),
      item: props.id
    }
  });

  return (
    <div className="suggestion-card flex items-center mb-5 p-1">
      <div className="suggestion-image mr-2">
        <img src={props.img} alt="" className="h-full w-full" />
      </div>
      <div className="suggestion-text">
        <div className="suggestion-title">
          <h3 className="text-white font-medium text-lg">{props.name}</h3>
          <p className="text-sm my-1">
            {/* {props.content.split(" ").slice(0, 6).join(" ")} */}
            {props?.content?.slice(0, 50)}
          </p>
        </div>
        <div className="suggestion-price flex justify-between items-center">
          <h3 className="text-white">Rs. {props.price}/-</h3>
          <div
            className=""
            onClick={() => {
              setLiked(!liked);
              addToFavoriteDish().then((res) => {
                if (res.data.addToFavorites.code === 200) {
                  alert(res.data.addToFavorites.message);
                }
              });
            }}
          >
            {searchFavorite?.searchFavorites?.success ? (
              liked ? (
                <AiOutlineHeart className="mr-2 text-white text-lg cursor-pointer" />
              ) : (
                <AiFillHeart className="mr-2 text-white text-lg cursor-pointer" />
              )
            ) : liked ? (
              <AiFillHeart className="mr-2 text-white text-lg cursor-pointer" />
            ) : (
              <AiOutlineHeart className="mr-2 text-white text-lg cursor-pointer" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
