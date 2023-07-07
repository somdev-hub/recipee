import React from "react";
import "./AllRecipees.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  GET_RECIPEES_BY_CATEGORY,
  GET_RECIPEES_BY_VEG
} from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Loader from "../../components/Loader/Loader";

const AllRecipees = () => {
  const { loading: vegRecipeeLoading, data: vegRecipeeData } = useQuery(
    GET_RECIPEES_BY_VEG,
    {
      variables: { nonveg: false }
    }
  );
  console.log(vegRecipeeData);
  const { loading: nonvegRecipeeLoading, data: nonvegRecipeeData } = useQuery(
    GET_RECIPEES_BY_VEG,
    {
      variables: {
        nonveg: true
      }
    }
  );
  console.log(nonvegRecipeeData);
  const { loading: breakfastRecipeeLoading, data: breakfastRecipeeData } =
    useQuery(GET_RECIPEES_BY_CATEGORY, {
      variables: {
        category: "breakfast"
      }
    });
  return (
    <div className="all-recipees flex">
      <Sidebar />
      {vegRecipeeLoading || nonvegRecipeeLoading || breakfastRecipeeLoading ? (
        <Loader />
      ) : (
        <div className="all-recipees-main text-white sm:mt-5">
          <nav>
            <h2>All Recipees</h2>
          </nav>
          <div className="veg-recipees mt-10">
            <h3>Vegetarian recipes</h3>
            <div className="veg-recipees-container flex mt-5">
              {vegRecipeeData?.getRecipeesByVeg.map((item, index) => {
                return <RecipeCard props={item} key={index} />;
              })}
            </div>
          </div>
          <div className="nonveg-recipees mt-10">
            <h3>Non-Vegetarian recipes</h3>
            <div className="veg-recipees-container flex mt-5">
              {nonvegRecipeeData?.getRecipeesByVeg.map((item, index) => {
                return <RecipeCard props={item} key={index} />;
              })}
            </div>
          </div>
          <div className="breakfast-recipees mt-10">
            <h3>Breakfast recipes</h3>
            <div className="veg-recipees-container"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRecipees;
