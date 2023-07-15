import React, { useEffect, useState } from "react";
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
  const [favDishes, setFavDishes] = useState([]);
  const [favCategories, setFavCategories] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [favPosts, setFavPosts] = useState([]);
  const [sidebarView, setSidebarView] = useState(false);
  const [rightbarView, setRightbarView] = useState(false);
  // console.log(data?.getFavorites[0].type === "dish");

  useEffect(() => {
    if (data) {
      data?.getFavorites.forEach((item, index) => {
        if (
          item.type === "dish" &&
          !favDishes.some((dish) => dish.id === item.id)
        ) {
          setFavDishes((prev) => [...prev, item]);
        } else if (
          item.type === "recipee" &&
          !favRecipes.some((recipe) => recipe.id === item.id)
        ) {
          setFavRecipes((prev) => [...prev, item]);
        } else if (
          item.type === "category" &&
          !favCategories.some((category) => category.id === item.id)
        ) {
          setFavCategories((prev) => [...prev, item]);
        } else if (
          item.type === "posts" &&
          !favPosts.some((post) => post.id === item.id)
        ) {
          setFavPosts((prev) => [...prev, item]);
        }
      });
    }
  }, [data, favCategories, favDishes, favPosts, favRecipes]);

  console.log(favDishes);

  return (
    <div className="favorites flex">
      <Sidebar sidebarView={sidebarView} />
      {loading && <Loader />}
      <div
        className={`favorites-content sm:mt-5 ${
          sidebarView || rightbarView ? "h-screen overflow-hidden" : ""
        }`}
      >
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
              <h3 className="text-white">Food items</h3>
              <div className="dishes-fav-container sm:flex sm:flex-wrap grid grid-cols-2 gap-5 mt-10">
                {favDishes.length > 0 &&
                  favDishes.map((item, index) => {
                    return <Dish props={item.dish} />;
                  })}
              </div>

              <h3 className="text-white mt-10">Recipes</h3>
              <div className="recipees-fav-container sm:flex sm:flex-wrap grid grid-cols-2 gap-5 mt-10">
                {favRecipes.length > 0 &&
                  favRecipes.map((item, index) => {
                    return (
                      <RecipeCard
                        img={item.recipee.image}
                        name={item.recipee.name}
                      />
                    );
                  })}
              </div>

              <h3 className="text-white mt-10">Categories</h3>
              <div className="recipees-fav-container mt-10 text-white">
                {favCategories.length > 0 &&
                  favCategories.map((item, index) => {
                    return (
                      <div className="mb-5">
                        <Choices item={item.category} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
      <Suggested />
    </div>
  );
};

export default Favorites;
