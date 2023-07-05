import React from "react";
import "./Dish.css";

const Dish = ({ props, click }) => {
  return (
    <div
      className="dish flex flex-col items-center cursor-pointer mr-5"
      onClick={click}
    >
      <div className="dish-img-container h-1/2 w-full">
        <img
          src={props.image || props.dish.image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="dish-details-container h-1/2 w-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h3 className="mb-2 text-white">{props.name || props.dish.name}</h3>
          <p>Rs. {props.price || props.dish.price}/-</p>
        </div>
      </div>
    </div>
  );
};

export default Dish;
