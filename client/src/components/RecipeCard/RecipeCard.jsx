import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./RecipeCard.css";

const RecipeCard = ({ props }) => {
  // console.log(props.image);
  return (
    <div className="recipe-card flex flex-col items-center sm:mr-5 cursor-pointer">
      <div className="recipe-img mt-2">
        <img
          src={props.image}
          alt=""
          className="w-full h-full rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="recipe-name flex flex-col justify-center items-center mt-5">
        <h3 className="text-white mb-5 text-lg font-medium">
          {props.name.length > 14
            ? props.name.slice(0, 14) + "..."
            : props.name}
        </h3>
        <div className="see-more flex gap-3 items-center">
          <p>See more</p>
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
