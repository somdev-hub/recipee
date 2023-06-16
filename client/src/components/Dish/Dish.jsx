import React from "react";
import "./Dish.css";

const Dish = ({ props, click }) => {
  return (
    <div
      className="dish flex flex-col justify-evenly items-center cursor-pointer "
      onClick={click}
    >
      <img src={props.img} alt="" />
      <div className="flex flex-col items-center">
        <h3 className="mb-2 text-white">{props.title}</h3>
        <p>Rs.{props.price}/-</p>
      </div>
    </div>
  );
};

export default Dish;
