import React, { useState } from "react";
import "./Favorites.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { favorites } from "../../utils/providers/favorites";
import Dish from "../../components/Dish/Dish";
import { recipe } from "../../utils/providers/recipe";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Suggested from "../../components/Suggested/Suggested";
import { useQuery } from "@apollo/client";
import { GET_FAVORITES } from "../../utils/graphql/queries";
import Loader from "../../components/Loader/Loader";
import Choices from "../../components/Choices/Choices";
import Posts from "../../components/Posts/Posts";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const Favorites = () => {
  const { loading, error, data } = useQuery(GET_FAVORITES, {
    variables: {
      user: localStorage.getItem("email")
    }
  });
  const [sidebarView, setSidebarView] = useState(false);
  const [rightbarView, setRightbarView] = useState(false);
  // console.log(data?.getFavorites[0].type === "dish");
  return (
    <div className="favorites flex">
      <Sidebar sidebarView={sidebarView} />
      {loading && <Loader />}
      <div className="favorites-content sm:mt-5">
        <MobileNavbar
          sidebarView={sidebarView}
          setSidebarView={setSidebarView}
          rightbarView={rightbarView}
          setRightbarView={setRightbarView}
        />

        {data?.getFavorites.length === 0 || !data ? (
          <div
            className="flex justify-center text-center text-white h-screen"
            onClick={() => {
              setSidebarView(false);
              setRightbarView(false);
            }}
          >
            {!loading && <h3>No data available</h3>}
          </div>
        ) : (
          <div
            className=""
            onClick={() => {
              setSidebarView(false);
              setRightbarView(false);
            }}
          >
            <nav className="">
              <h2 className="text-white">Favorites</h2>
            </nav>
            <div className="fav-foods mt-10">
              {data?.getFavorites.map((item, index) => {
                if (item.type === "dish") {
                  return (
                    <div className="">
                      <h3 className="text-white">Food items</h3>
                      <div className="fav-container overflow-x-auto mt-10">
                        <div className="fav-content favourite-foods-content flex">
                          <Dish props={item.dish} />
                        </div>
                      </div>
                    </div>
                  );
                } else if (item.type === "recipee") {
                  return (
                    <div className="mt-10">
                      <h3 className="text-white">Recipes</h3>
                      <div className="recipe-container mt-10 overflow-x-auto">
                        <div className="w-auto flex">
                          <RecipeCard
                            img={item.recipee.image}
                            name={item.recipee.name}
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else if (item.type === "category") {
                  return (
                    <div className="mt-10 text-white">
                      <h3 className="">Categories</h3>
                      <div className="recipe-container mt-10 overflow-x-auto">
                        <div className="flex">
                          <Choices item={item.category} />
                        </div>
                      </div>
                    </div>
                  );
                } else if (item.type === "posts") {
                  return (
                    <div className="mt-10">
                      <h3 className="text-white">Recipes</h3>
                      <div className="recipe-container mt-10 overflow-x-auto">
                        <div className="recipies flex">
                          <Posts props={item.posts} />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
      <Suggested />
    </div>
  );
};

export default Favorites;
