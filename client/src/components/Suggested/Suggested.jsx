import React from "react";
import "./Suggested.css";
import { suggestions } from "../../utils/providers/suggested";
import SuggestionCard from "../SuggestionCard/SuggestionCard";

const Suggested = (props) => {
  return (
    <div
      className="suggested flex flex-col  h-screen fixed"
      style={
        window.innerWidth < 640
          ? { right: props.rightbarView ? "0" : "-100%" }
          : { right: "0" }
      }
    >
      <h3 className="text-white ml-5 mt-5">Suggested items</h3>
      <div className="suggested-container mt-10 ml-5">
        {suggestions.map((item, index) => {
          return (
            <SuggestionCard
              key={index}
              img={item.img}
              name={item.name}
              content={item.content}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Suggested;
