import React from "react";
import "./FilterBar.css";
import { BsArrowRightShort } from "react-icons/bs";

const FilterBar = ({ visibility }) => {
  return (
    <div
      className={`filter-bar w-full mt-3 ${visibility ? "open" : ""}`}
      //   style={{ display: visibility ? "block" : "none" }}
    >
      <div className="filter-container flex sm:flex-row flex-col justify-between sm:m-5 mx-5">
        <div className="filter-item set-veg sm:mt-0 mt-7">
          <h3>Vegetarian</h3>
          <select name="" id="" className="mt-3">
            <option value="">Yes</option>
            <option value="">No</option>
          </select>
        </div>
        <div className="filter-item set-veg sm:mt-0 mt-7">
          <h3>Category</h3>
          <select name="" id="" className="mt-3">
            <option value="">Breakfast</option>
            <option value="">Lunch</option>
            <option value="">Snacks</option>
            <option value="">Dinner</option>
          </select>
        </div>
        <div className="filter-item set-veg sm:mt-0 mt-7">
          <h3>Menu</h3>
          <select name="" id="" className="mt-3">
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
      </div>
      <div className="filter-submit flex justify-end items-center m-5">
        {/* <button type="submit">Filter</button> */}
        {/* <h3>Continue</h3> */}
        <span>
          <p className="text-sm">Continue</p>
        </span>
        <BsArrowRightShort className="text-xl flex" />
      </div>
    </div>
  );
};

export default FilterBar;
