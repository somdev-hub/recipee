import React from "react";
import "./Choices.css";

const CuisineItems = ({ items }) => {
  return (
    <div className="item">
      <img src={items.img} alt="" />
      <div className="flex flex-col items-center cuis-item mt-3">
        <h3 className="text-sm mb-1">{items.title}</h3>
        <p className="text-sm">Rs.{items.price}/-</p>
      </div>
    </div>
  );
};

const Choices = (props) => {
  return (
    <div className="choice flex items-center mr-5 p-5">
      <div className="main flex flex-col justify-center items-center">
        <img src={props.cuisineImg} alt="" />
        <h3 className="text-xl text-center mt-3">{props.cuisine}</h3>
      </div>
      <div className="cuisine-content grid grid-cols-3 grid-rows-2 gap-x-16 gap-y-5 m-auto">
        {props.cuisineContent.map((items) => {
          return <CuisineItems items={items} />;
        })}
      </div>
    </div>
  );
};

export default Choices;
