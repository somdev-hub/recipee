import React from "react";
import "./SuggestionCard.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const SuggestionCard = (props) => {
  const [liked, setLiked] = React.useState(false);
  return (
    <div className="suggestion-card flex items-center mb-5">
      <div className="suggestion-image mr-2">
        <img src={props.img} alt="" className="h-full w-full" />
      </div>
      <div className="suggestion-text px-2">
        <div className="suggestion-title mb-2">
          <h3 className="text-white">{props.name}</h3>
          <p className="text-sm">
            {props.content.split(" ").slice(0, 6).join(" ")}
          </p>
        </div>
        <div className="suggestion-price flex justify-between items-center">
          <h3 className="text-white">Rs. {props.price}/-</h3>
          <div className="" onClick={() => setLiked(!liked)}>
            {liked ? (
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
