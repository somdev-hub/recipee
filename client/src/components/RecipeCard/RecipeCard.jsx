import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./RecipyCard.css";

const RecipeCard = (props) => {
  return (
    <div className="recipe-card flex flex-col items-center mr-5 cursor-pointer">
      <div className="recipe-img mt-2">
        <img src={props.img} alt="" className="w-full h-full rounded-lg" />
      </div>
      <div className="recipe-name flex flex-col justify-center items-center mt-5">
        <h3 className="text-white mb-5 text-lg font-medium">{props.name}</h3>
        <div className="see-more flex gap-3 items-center">
          <p>See more</p>
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
