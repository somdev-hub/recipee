import React, { useState } from "react";
import "./Profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AiOutlineEdit } from "react-icons/ai";
import { useQuery } from "@apollo/client";
import {
  GET_CATEGORIES_BY_SELLERID,
  GET_DISHES_BY_SELLERID,
  GET_ORDER_PLACED,
  GET_POSTS_BY_AUTHORMAIL,
  GET_PROFILE,
  GET_RECIPEES_BY_AUTHOR
} from "../../utils/graphql/queries";
import ProfileBar from "../../components/ProfileBar/ProfileBar";
import Dish from "../../components/Dish/Dish";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Loader from "../../components/Loader/Loader";
import Loader2 from "../../components/Loader2/Loader2";
import Posts from "../../components/Posts/Posts";
import { Link } from "react-router-dom";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import Choices from "../../components/Choices/Choices";
import profile_background from "../../utils/profile_background.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import PlacedOrderCard from "../../components/PlacedOrderCard/PlacedOrderCard";

const Profile = () => {
  const { loading: profileLoading, data: profile } = useQuery(GET_PROFILE, {
    variables: { email: localStorage.getItem("email") }
  });
  const { loading: dishLoading, data: dishes } = useQuery(
    GET_DISHES_BY_SELLERID,
    {
      variables: {
        sellerId: localStorage.getItem("email")
      }
    }
  );
  const { loading: recipeeLoading, data: recipees } = useQuery(
    GET_RECIPEES_BY_AUTHOR,
    {
      variables: {
        author: localStorage.getItem("email")
      }
    }
  );
  const { loading: postLoading, data: posts } = useQuery(
    GET_POSTS_BY_AUTHORMAIL,
    {
      variables: {
        authorMail: localStorage.getItem("email")
      }
    }
  );
  const { loading: categoryLoading, data: categories } = useQuery(
    GET_CATEGORIES_BY_SELLERID,
    {
      variables: {
        sellerId: localStorage.getItem("email")
      }
    }
  );
  const { loading: placedOrdersLoading, data: placedOrders } = useQuery(
    GET_ORDER_PLACED,
    {
      variables: {
        restaurantId: localStorage.getItem("email")
      }
    }
  );
  // console.log(placedOrders);
  const isCustomer = profile?.getProfile?.client === "customer";

  const [collection, setCollection] = useState({
    dishes: isCustomer && false,
    recipees: isCustomer && true,
    articles: false,
    categories: false
  });
  const handleCollection = (e) => {
    const selectedCollection = e.target.dataset.collection;
    setCollection({
      dishes: selectedCollection === "dishes",
      recipees: selectedCollection === "recipees",
      articles: selectedCollection === "articles",
      categories: selectedCollection === "categories"
    });
  };
  const [sidebarView, setSidebarView] = useState(false);
  const [rightbarView, setRightbarView] = useState(false);
  const [mobileOptions, setMobileOptions] = useState(false);
  // console.log(profile);
  return (
    <div className="profile flex">
      <Sidebar sidebarView={sidebarView} />
      {profileLoading ? (
        <Loader />
      ) : (
        <div
          className={`profile-main sm:mt-5 text-white ${
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
            <div className="profile-head w-full relative pb-5">
              <div className="profile-background">
                <img
                  src={profile_background}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="profile-picture rounded-full absolute">
                <img
                  src={profile?.getProfile?.image}
                  alt=""
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div className="profile-header w-full">
                <div className="profile-header-main flex justify-between w-full sm:mt-24 mt-20">
                  <div className="profile-name">
                    <h2 className="sm:text-3xl text-2xl font-bold">
                      {profile?.getProfile.firstName}{" "}
                      {profile?.getProfile.lastName}
                    </h2>
                    <p className="sm:mt-2 mt-1 text-base sm:text-lg">
                      {profile?.getProfile.client}
                    </p>
                  </div>
                  <AiOutlineEdit className="text-2xl" />
                </div>
              </div>
              <div className="profile-info mt-5 flex sm:flex-row flex-col gap-5 text-left flex-1">
                <div className="info1 flex flex-col text-center justify-center items-center p-5 sm:w-1/3">
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-sm mt-3">
                    {profile?.getProfile.address}, {profile?.getProfile.city},
                    {profile?.getProfile.pin},
                  </p>
                </div>
                <div className="info1 flex flex-col text-center justify-center items-center p-5 sm:w-1/3">
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-sm mt-3">{profile?.getProfile.phone}</p>
                </div>
                <div className="info1 flex flex-col text-center justify-center items-center p-5 sm:w-1/3">
                  <h3 className="font-semibold">Email Id</h3>
                  <p className="text-sm mt-3">{profile?.getProfile.email}</p>
                </div>
              </div>
            </div>
            <div className="profile-collection mt-5">
              <div className="collection-bar">
                {window.innerWidth < 640 && (
                  <div
                    className="mobile-options flex justify-between mb-5"
                    onClick={() => setMobileOptions(!mobileOptions)}
                  >
                    <h3 className="font-semibold">Options</h3>
                    <MdOutlineKeyboardArrowDown className="text-xl" />
                  </div>
                )}
                <ul
                  className={`flex sm:flex-row flex-col ${
                    isCustomer ? "justify-around" : "justify-between"
                  }`}
                  style={
                    window.innerWidth < 640
                      ? {
                          display: mobileOptions ? "flex" : "none"
                        }
                      : { display: "flex" }
                  }
                >
                  <li
                    onClick={handleCollection}
                    data-collection="dishes"
                    className={collection.dishes ? "active" : ""}
                    style={{
                      display: isCustomer ? "none" : "block"
                    }}
                  >
                    Dishes
                  </li>
                  <li
                    onClick={handleCollection}
                    data-collection="recipees"
                    className={collection.recipees ? "active" : ""}
                  >
                    Recipees
                  </li>
                  <li
                    onClick={handleCollection}
                    data-collection="articles"
                    className={collection.articles ? "active" : ""}
                  >
                    Articles
                  </li>
                  <li
                    onClick={handleCollection}
                    data-collection="categories"
                    className={collection.categories ? "active" : ""}
                    style={{
                      display: isCustomer ? "none" : "block"
                    }}
                  >
                    Categories
                  </li>
                </ul>
              </div>
            </div>
            <div className="collection-container">
              {!isCustomer &&
                (dishLoading && collection.dishes ? (
                  <div className="mt-5">
                    <Loader2 />
                  </div>
                ) : (
                  <div
                    className=""
                    style={{ display: !collection.dishes ? "none" : "block" }}
                  >
                    <div className="dish-collection sm:flex sm:flex-wrap mt-10 grid grid-cols-2 gap-5">
                      {dishes?.getDishesBySellerId.map((item, index) => {
                        return <Dish props={item} key={index} />;
                      })}
                    </div>
                    <div className="add-more my-10 flex justify-center">
                      <Link to="/add-recipee">
                        <button className="text-sm">Add Dish</button>
                      </Link>
                    </div>
                  </div>
                ))}
              {recipeeLoading && collection.recipees ? (
                <div className="mt-5">
                  <Loader2 />
                </div>
              ) : (
                <div
                  className=""
                  style={{ display: !collection.recipees ? "none" : "block" }}
                >
                  <div className="recipee-collection sm:flex mt-10 grid grid-cols-2 gap-5">
                    {recipees?.getRecipeesByAuthor.map((item, index) => {
                      return <RecipeCard props={item} key={index} />;
                    })}
                  </div>
                  <div className="add-more my-10 flex justify-center">
                    <Link to="/add-recipee">
                      <button className="text-sm">Add Recipe</button>
                    </Link>
                  </div>
                </div>
              )}
              {postLoading && collection.articles ? (
                <div className="mt-5">
                  <Loader2 />
                </div>
              ) : (
                <div
                  className=""
                  style={{ display: !collection.articles ? "none" : "block" }}
                >
                  <div className="articles-collection mt-10">
                    {posts?.getPostByAuthorMail.map((item, index) => {
                      return <Posts props={item} key={index} />;
                    })}
                  </div>
                  <div className="add-more my-10 flex justify-center">
                    <Link to="/community">
                      <button className="text-sm">Post Article</button>
                    </Link>
                  </div>
                </div>
              )}
              {!isCustomer &&
                (categoryLoading && collection.categories ? (
                  <div className="mt-5">
                    <Loader2 />
                  </div>
                ) : (
                  <div
                    className=""
                    style={{
                      display: !collection.categories ? "none" : "block"
                    }}
                  >
                    <div className="articles-collection mt-10">
                      {categories?.getCategoriesBySellerId.map(
                        (item, index) => {
                          // console.log(item);
                          return <Choices item={item} key={index} />;
                        }
                      )}
                    </div>
                    <div className="add-more my-10 flex justify-center">
                      <Link to="/add-category">
                        <button className="text-sm">Add category</button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
            {!isCustomer && (
              <div className="order-placed-container mt-5">
                <h3>Placed orders</h3>
                {placedOrdersLoading ? (
                  <Loader2 />
                ) : (
                  <div className="order-placed-main sm:grid sm:grid-cols-2 sm:gap-5 mt-5">
                    {placedOrders?.getOrdersPlaced.map((item, index) => {
                      return <PlacedOrderCard props={item} key={index} />;
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <ProfileBar
        rightbarView={rightbarView}
        setRightbarView={setRightbarView}
      />
    </div>
  );
};

export default Profile;
