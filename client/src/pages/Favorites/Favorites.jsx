import React from "react";
import "./Favorites.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { favorites } from "../../utils/providers/favorites";
import Dish from "../../components/Dish/Dish";
import { recipe } from "../../utils/providers/recipe";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Suggested from "../../components/Suggested/Suggested";

const Favorites = () => {
  return (
    <div className="favorites flex">
      <Sidebar />
      <div className="favorites-content mt-5">
        <nav className="">
          <h2 className="text-white">Favourites</h2>
        </nav>
        <div className="fav-foods mt-10">
          <h3 className="text-white">Food items</h3>
          <div className="fav-container overflow-x-auto mt-10">
            <div className="fav flex justify-between">
              {favorites.map((item, index) => {
                return <Dish props={item} key={index} />;
              })}
            </div>
          </div>
        </div>
        <div className="fav-recipes mt-10">
          <h3 className="text-white">Recipes</h3>
          <div className="recipe-container mt-10 overflow-x-auto">
            <div className="recipies flex">
              {recipe.map((item, index) => {
                return (
                  <RecipeCard img={item.img} name={item.name} key={index} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Suggested />
    </div>
  );
};

export default Favorites;
