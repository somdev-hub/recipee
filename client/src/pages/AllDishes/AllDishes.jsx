import React, { useState } from "react";
import "./AllDishes.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  GET_DISHES_BY_CATEGORY,
  GET_VEG_DISHES
} from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import Dish from "../../components/Dish/Dish";
import DishFilter from "../../components/DishFilter/DishFilter";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import Loader from "../../components/Loader/Loader";
import InfoCard from "../../components/InfoCard/InfoCard";

const AllDishes = () => {
  const [sidebarView, setSidebarView] = useState(false);
  const [pos, setPos] = useState(false);
  const [info, setInfo] = useState({});
  const [rightbarView, setRightbarView] = useState(false);
  const {
    loading: vegLoading,
    error,
    data: vegDishes
  } = useQuery(GET_VEG_DISHES, {
    variables: { nonveg: false }
  });
  const {
    loading: nonVegLoading,
    error: nonVegError,
    data: nonVegDishes
  } = useQuery(GET_VEG_DISHES, {
    variables: { nonveg: true }
  });
  const { loading: breakfastLoading, data: breakfastData } = useQuery(
    GET_DISHES_BY_CATEGORY,
    {
      variables: { category: "breakfast" }
    }
  );
  const { loading: lunchLoading, data: lunchData } = useQuery(
    GET_DISHES_BY_CATEGORY,
    {
      variables: { category: "lunch" }
    }
  );
  const { loading: dinnerLoading, data: dinnerData } = useQuery(
    GET_DISHES_BY_CATEGORY,
    {
      variables: { category: "dinner" }
    }
  );
  // console.log(vegDishes);
  return (
    <div className="all-dishes flex">
      <Sidebar sidebarView={sidebarView} />
      {vegLoading ||
      nonVegLoading ||
      breakfastLoading ||
      lunchLoading ||
      dinnerLoading ? (
        <Loader />
      ) : (
        <div className="all-dishes-main sm:mt-5 text-white">
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
              <h2 className="w-full">All Dishes</h2>
            </nav>

            <div className="top-veg mt-10">
              <h3>Top Vegetarian</h3>
              <div className="top-veg-container mt-5 sm:flex grid grid-cols-2 sm:gap-0 gap-5">
                {vegDishes?.getDishesByVeg.map((item, index) => {
                  return (
                    <Dish
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
            <div className="top-nonveg mt-10">
              <h3>Top Non-vegetarian</h3>
              <div className="top-nonveg-container mt-5 sm:flex grid grid-cols-2 sm:gap-0 gap-5">
                {nonVegDishes?.getDishesByVeg.map((item, index) => {
                  return (
                    <Dish
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
            <div className="top-breakfast mt-10">
              <h3>Top Breakfast</h3>
              <div className="top-breakfast-container mt-5 sm:flex grid grid-cols-2 sm:gap-0 gap-5">
                {breakfastData?.getDishesByCategory.map((item, index) => {
                  return (
                    <Dish
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
            <div className="top-breakfast mt-10">
              <h3>Top Lunch</h3>
              <div className="top-breakfast-container mt-5 sm:flex grid grid-cols-2 sm:gap-0 gap-5">
                {lunchData?.getDishesByCategory.map((item, index) => {
                  return (
                    <Dish
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
            <div className="top-breakfast mt-10">
              <h3>Top Dinner</h3>
              <div className="top-breakfast-container mt-5 sm:flex grid grid-cols-2 sm:gap-0 gap-5">
                {dinnerData?.getDishesByCategory.map((item, index) => {
                  return (
                    <Dish
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
          </div>
        </div>
      )}
      <DishFilter rightbarView={rightbarView} />
      <InfoCard
        pos={pos ? "0" : "-50%"}
        posMini={pos ? "0" : "-110%"}
        props={info}
        onClick={() => setPos(false)}
      />
    </div>
  );
};

export default AllDishes;
