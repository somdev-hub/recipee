import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BsSliders2Vertical } from "react-icons/bs";
import ad1 from "../../utils/ad1.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import Dish from "../../components/Dish/Dish";
import { favorites } from "../../utils/providers/favorites";
import Choices from "../../components/Choices/Choices";
import image_4 from "../../utils/image_4.png";
import { choices } from "../../utils/providers/choices";
import RightBar from "../../components/RightBar/RightBar";
import InfoCard from "../../components/InfoCard/InfoCard";

const Dashboard = () => {
  const [pos, setPos] = useState(false);
  const [info, setInfo] = useState({});

  return (
    <div className="dashboard flex relative overflow-hidden">
      <Sidebar blur={pos} />
      <div
        className={`main-content mt-5 ${
          pos ? "brightness-50 transition-all" : ""
        }`}
      >
        <nav className="flex justify-between">
          <h2>Hi, welcome to Recipee dashboard</h2>
          <div className="search flex">
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
          </p>
          <img src={ad1} alt="" className="absolute" />
        </div>
        <div className="favorites">
          <div className="flex justify-between items-center mt-10">
            <h3 className="">Your Favorites</h3>
            <p className="flex items-center gap-3 view">
              View all
              <AiOutlineArrowRight />
            </p>
          </div>
          <div className="fav-container overflow-x-auto mt-10">
            <div className="fav flex justify-between">
              {favorites.map((item, index) => {
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
        <div className="choices">
          <div className="flex justify-between items-center mt-10">
            <h3 className="">Based on your choices</h3>
            <p className="flex items-center gap-3 view">
              View all
              <AiOutlineArrowRight />
            </p>
          </div>
          <div className="choice-container mt-10 overflow-x-auto">
            <div className="choice-cards flex">
              <Choices
                cuisineImg={image_4}
                cuisine={"South Indian Cuisine"}
                cuisineContent={choices}
              />
              <Choices
                cuisineImg={image_4}
                cuisine={"South Indian Cuisine"}
                cuisineContent={choices}
              />
            </div>
          </div>
        </div>
      </div>
      
      <RightBar />
      <InfoCard pos={pos ? "0" : "-50%"} props={info}/>
    </div>
  );
};

export default Dashboard;
