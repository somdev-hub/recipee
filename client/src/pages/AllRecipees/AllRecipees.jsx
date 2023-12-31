import React, { useState } from "react";
import "./AllRecipees.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  GET_RECIPEES_BY_CATEGORY,
  GET_RECIPEES_BY_VEG
} from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Loader from "../../components/Loader/Loader";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import DishFilter from "../../components/DishFilter/DishFilter";
import RecipeeInfo from "../../components/RecipeeInfo/RecipeeInfo";

const AllRecipees = () => {
  const { loading: vegRecipeeLoading, data: vegRecipeeData } = useQuery(
    GET_RECIPEES_BY_VEG,
    {
      variables: { nonveg: false }
    }
  );
  // console.log(vegRecipeeData);
  const { loading: nonvegRecipeeLoading, data: nonvegRecipeeData } = useQuery(
    GET_RECIPEES_BY_VEG,
    {
      variables: {
        nonveg: true
      }
    }
  );
  // console.log(nonvegRecipeeData);
  const { loading: breakfastRecipeeLoading, data: breakfastRecipeeData } =
    useQuery(GET_RECIPEES_BY_CATEGORY, {
      variables: {
        category: "breakfast"
      }
    });
  const [sidebarView, setSidebarView] = useState(false);
  const [rightbarView, setRightbarView] = useState(false);
  const [info, setInfo] = useState(null);
  const [pos, setPos] = useState(false);
  return (
    <div className="all-recipees flex">
      <Sidebar sidebarView={sidebarView} />
      {vegRecipeeLoading || nonvegRecipeeLoading || breakfastRecipeeLoading ? (
        <Loader />
      ) : (
        <div
          className={`all-recipees-main text-white sm:mt-5 ${
            sidebarView || rightbarView
              ? "h-screen-dvh overflow-hidden brightness-50 transition-all"
              : ""
          }`}
        >
          <MobileNavbar
            sidebarView={sidebarView}
            rightbarView={rightbarView}
            setSidebarView={setSidebarView}
            setRightbarView={setRightbarView}
          />
          <div
            className=""
            onClick={() => {
              setRightbarView(false);
              setSidebarView(false);
            }}
          >
            <nav>
              <h2 className="w-full">All Recipees</h2>
            </nav>
            <div className="veg-recipees mt-10">
              <h3>Vegetarian recipes</h3>
              <div className="veg-recipees-container sm:flex sm:flex-wrap grid grid-cols-2 gap-5 mt-5">
                {vegRecipeeData?.getRecipeesByVeg.map((item, index) => {
                  return (
                    <RecipeCard
                      props={item}
                      key={index}
                      click={() => {
                        setInfo(item);
                        setPos(!pos);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="nonveg-recipees mt-10">
              <h3>Non-Vegetarian recipes</h3>
              <div className="veg-recipees-container sm:flex grid grid-cols-2 gap-5 mt-5">
                {nonvegRecipeeData?.getRecipeesByVeg.map((item, index) => {
                  return (
                    <RecipeCard
                      props={item}
                      key={index}
                      click={() => {
                        setInfo(item);
                        setPos(!pos);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="breakfast-recipees mt-10">
              <h3>Breakfast recipes</h3>
              <div className="veg-recipees-container"></div>
            </div>
          </div>
        </div>
      )}
      <DishFilter rightbarView={rightbarView} />
      <RecipeeInfo
        pos={pos ? "0" : "-50%"}
        posMini={pos ? "0" : "-110%"}
        info={info}
        onClick={() => setPos(false)}
      />
    </div>
  );
};

export default AllRecipees;
