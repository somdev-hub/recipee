import React from "react";
import "./Suggested.css";
// import { suggestions } from "../../utils/providers/suggested";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import { GET_DISHES } from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import Loader2 from "../Loader2/Loader2";
import { RxCross2 } from "react-icons/rx";

const Suggested = (props) => {
  const { data: searchResults, loading } = useQuery(GET_DISHES);
  // console.log(searchResults);
  return (
    <div
      className="suggested flex flex-col  h-screen fixed transition-all overflow-y-auto no-scrollbar p-5"
      style={
        window.innerWidth < 640
          ? { right: props.rightbarView ? "0" : "-100%" }
          : { right: "0" }
      }
    >
      <div className="flex gap-3 text-white">
        {window.innerWidth < 640 && (
          <RxCross2
            className="text-2xl"
            onClick={() => props.setRightbarView(false)}
          />
        )}
        <h3>Suggested items</h3>
      </div>
      <div className="suggested-container mt-5">
        {loading && <Loader2 />}
        {searchResults?.dishes.map((item, index) => {
          return (
            <SuggestionCard
              key={index}
              img={item.image}
              name={item.name}
              content={item.dishDescription}
              price={item.price}
              id={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Suggested;
