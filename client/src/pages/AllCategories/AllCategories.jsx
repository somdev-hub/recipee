import React, { useState } from "react";
import "./AllCategories.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import DishFilter from "../../components/DishFilter/DishFilter";
import { GET_CATEGORY_BY_VEG } from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Choices from "../../components/Choices/Choices";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import InfoCard2 from "../../components/InfoCard2/InfoCard2";

const AllCategories = () => {
  const [sidebarView, setSidebarView] = useState(false);
  const [pos, setPos] = useState(false);
  const [info, setInfo] = useState({});
  const [rightbarView, setRightbarView] = useState(false);
  const { loading: vegCategoryLoading, data: vegCategoryData } = useQuery(
    GET_CATEGORY_BY_VEG,
    {
      variables: { isNonVeg: false }
    }
  );
  const { loading: nonVegCategoryLoading, data: nonVegCategoryData } = useQuery(
    GET_CATEGORY_BY_VEG,
    {
      variables: { isNonVeg: true }
    }
  );

  console.log(nonVegCategoryLoading ? "loading..." : vegCategoryData);

  return (
    <div className="all-categories flex">
      <Sidebar sidebarView={sidebarView} />
      {vegCategoryLoading || nonVegCategoryLoading ? (
        <Loader />
      ) : (
        <div
          className={`all-categories-main text-white sm:mt-5 ${
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
              setSidebarView(false);
              setRightbarView(false);
            }}
          >
            <nav>
              <h2 className="w-full">All Categories</h2>
            </nav>
            <div className="veg-categories mt-10">
              <h3>Vegetarian categories</h3>
              <div className="veg-categories-content mt-5 ">
                {vegCategoryData?.getCategoriesByVeg?.map((category) => {
                  return (
                    <Choices
                      item={category}
                      click={() => {
                        setPos(!pos);
                        setInfo(category);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="veg-categories mt-10">
              <h3>Non-Vegetarian categories</h3>
              {nonVegCategoryData?.getCategoriesByVeg?.map((category) => {
                return <Choices item={category} />;
              })}
            </div>
            <div className="veg-categories mt-10">
              <h3>Lunch categories</h3>
            </div>
          </div>
        </div>
      )}
      <DishFilter rightbarView={rightbarView} />
      <InfoCard2
        pos2={pos ? "0" : "-50%"}
        posMini={pos ? "0" : "-110%"}
        props={info}
        onClick={() => setPos(false)}
      />
    </div>
  );
};

export default AllCategories;
