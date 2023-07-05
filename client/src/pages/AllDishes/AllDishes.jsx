import React from "react";
import "./AllDishes.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { GET_VEG_DISHES } from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import Dish from "../../components/Dish/Dish";

const AllDishes = () => {
  const {
    loading,
    error,
    data: vegDishes
  } = useQuery(GET_VEG_DISHES, {
    variables: { nonveg: false }
  });
  console.log(vegDishes);
  return (
    <div className="all-dishes flex">
      <Sidebar />
      <div className="all-dishes-main mt-5 text-white">
        <nav>
          <h2 className="w-full">All Dishes</h2>
        </nav>

        <div className="top-veg mt-10">
          <h3>Top Vegetarian</h3>
          <div className="top-veg-container mt-5 flex">
            {vegDishes?.getDishesByVeg.map((dish, index) => {
              return <Dish props={dish} key={index} />;
            })}
          </div>
        </div>
        <div className="top-nonveg">
          <h3>Top Non-vegetarian</h3>
          <div className="top-nonveg-container mt-5"></div>
        </div>
        <div className="top-breakfast">
          <h3>Top Breakfast</h3>
          <div className="top-breakfast-container mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default AllDishes;
