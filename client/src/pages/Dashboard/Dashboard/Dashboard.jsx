import React from "react";
import "./Dashboard.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { BsSliders2Vertical } from "react-icons/bs";
import ad1 from "../../../utils/ad1.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import Dish from "../../../components/Dish/Dish";
import { favorites } from "../../../utils/providers/favorites";

const Dashboard = () => {
  return (
    <div className="dashboard flex">
      <Sidebar />
      <div className="main-content ml-5 mt-5">
        <nav className="flex justify-between">
          <h2>Hi, welcome to Recipee dashboard</h2>
          <div className="search flex mr-5">
            <input type="text" placeholder="Search here" className="mr-5" />
            <div className="filter flex justify-center items-center">
              <BsSliders2Vertical className="text-xl flex" />
            </div>
          </div>
        </nav>
        <div className="ad1 w-full mt-10 p-5 relative">
          <h3>Add your own recipe</h3>
          <p>
            Now you an share your own recipe with us to enjoy fresh meal and win
            exciting rewards so hurry up
            <img src={ad1} alt="" className="absolute" />
          </p>
        </div>
        <div className="favorites">
          <div className="flex justify-between items-center mt-10">
            <h3 className="">Your Favorites</h3>
            <p className="flex items-center gap-3 view">
              View all
              <AiOutlineArrowRight />
            </p>
          </div>
          <div className="fav flex justify-between mt-10">
            {favorites.map((item) => {
              return <Dish props={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
