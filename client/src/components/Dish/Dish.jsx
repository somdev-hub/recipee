import React from "react";
import "./Dish.css";

const Dish = ({ props, click, size }) => {
  const name = props.name || props.dish.name;
  return (
    <div
      className="dish flex flex-col items-center cursor-pointer mr-5"
      onClick={click}
      style={
        size === "small"
          ? { width: "9rem", height: "11rem" }
          : { width: "10rem", height: "12rem" }
      }
    >
      <div className="dish-img-container h-1/2 w-full">
        <img
          src={props.image || props.dish.image}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="dish-details-container h-1/2 w-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h3 className="mb-2 text-white">
            {name.length < 15 ? name : name.slice(0, 15) + "..."}
          </h3>
          <p>Rs. {props.price || props.dish.price}/-</p>
        </div>
      </div>
    </div>
  );
};

export default Dish;
