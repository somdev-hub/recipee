import React from "react";
import "./DishFilter.css";

const DishFilter = (props) => {
  return (
    <div
      className="dish-filter p-5 h-screen fixed text-white"
      style={
        window.innerWidth < 640
          ? { right: props.rightbarView ? "0" : "-100%" }
          : { right: "0" }
      }
    >
      <div className="dish-filter-main">
        <h3>Filter</h3>
        <div className="dish-filter-form mt-5 w-full">
          <form action="">
            <div className="w-full">
              <p className="text-sm">Filter by category</p>
              <select name="" id="" className="mt-3 w-full text-sm">
                <option value="">Desserts</option>
                <option value="">Main Course</option>
                <option value="">Chinese</option>
                <option value="">American</option>
                <option value="">Mexican</option>
                <option value="">Italian</option>
                <option value="">South Indian</option>
                <option value="">North Indian</option>
              </select>
            </div>
            <div className="w-full mt-5">
              <p className="text-sm">Filter by veg</p>
              <select name="" id="" className="mt-3 w-full text-sm">
                <option value="">Vegetarian</option>
                <option value="">Non-Vegetarian</option>
              </select>
            </div>
            <div className="w-full mt-5">
              <p className="text-sm">Filter by preparation time</p>
              <select name="" id="" className="mt-3 w-full text-sm">
                <option value="">5 mins</option>
                <option value="">10 mins</option>
                <option value="">20 mins</option>
                <option value="">30 mins</option>
                <option value="">1 hour</option>
                <option value="">More then 1 hour</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DishFilter;
