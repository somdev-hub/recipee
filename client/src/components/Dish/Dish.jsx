import React from "react";
import "./Dish.css";

const Dish = ({ props, click }) => {
  return (
    <div
      className="dish flex flex-col justify-evenly items-center cursor-pointer mr-5"
      onClick={click}
    >
      <img src={props.image || props.dish.image} alt="" />
      <div className="flex flex-col items-center">
        <h3 className="mb-2 text-white">{props.name || props.dish.name}</h3>
        <p>Rs. {props.price || props.dish.price}/-</p>
      </div>
    </div>
  );
};

export default Dish;
