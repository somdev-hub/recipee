import React from "react";
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

const Favorites = () => {
  const { loading, error, data } = useQuery(GET_FAVORITES, {
    variables: {
      user: localStorage.getItem("email")
    }
  });
  console.log(data?.getFavorites[0].type === "dish");
  return (
    <div className="favorites flex">
      <Sidebar />
      {loading && <Loader />}
      <div className="favorites-content mt-5">
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
                    <div className="fav flex">
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
                    <div className="recipies flex">
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
                <div className="mt-10">
                  <h3 className="text-white">Categories</h3>
                  <div className="recipe-container mt-10 overflow-x-auto">
                    <div className="recipies flex">
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
      <Suggested />
    </div>
  );
};

export default Favorites;
