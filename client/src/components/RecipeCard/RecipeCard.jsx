import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./RecipyCard.css";

const RecipeCard = (props) => {
  return (
    <div className="recipe-card flex flex-col justify-evenly items-center mr-5">
      <div className="recipe-img">
        <img src={props.img} alt="" className="w-full h-full rounded-lg" />
      </div>
      <div className="recipe-name">
        <h3 className="text-white">{props.name}</h3>
      </div>
      <div className="see-more flex gap-3 items-center">
        <p>See more</p>
        <AiOutlineArrowRight />
      </div>
    </div>
  );
};

export default RecipeCard;
