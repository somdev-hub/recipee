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
      <h3>Filter</h3>
    </div>
  );
};

export default DishFilter;
