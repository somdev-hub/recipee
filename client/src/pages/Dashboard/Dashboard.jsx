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
import InfoCard2 from "../../components/InfoCard2/InfoCard2";
import { choice } from "../../utils/providers/choice";

const Dashboard = () => {
  const [pos, setPos] = useState(false);
  const [pos2, setPos2] = useState(false);
  const [info, setInfo] = useState({});
  const [info2, setInfo2] = useState({});

  return (
    <div className="dashboard flex relative overflow-hidden">
      <Sidebar blur={pos || pos2} />
      <div
        className={`main-content mt-5 ${
          pos || pos2 ? "brightness-50 transition-all" : ""
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
              {choice.map((item, index) => {
                return (
                  <Choices
                    cuisineImg={item.cuisineImg}
                    cuisine={item.cuisineName}
                    cuisineContent={item.foods}
                    click={() => {
                      setPos2(!pos2);
                      setInfo2(item);
                    }}
                    key={index}
                  />
                );
              })}
              {/* <Choices
                cuisineImg={image_4}
                cuisine={"South Indian Cuisine"}
                cuisineContent={choices}
                click={() => setPos2(!pos2)}
              />
              <Choices
                cuisineImg={image_4}
                cuisine={"South Indian Cuisine"}
                cuisineContent={choices}
                click={() => setPos2(!pos2)}
              /> */}
            </div>
          </div>
        </div>
      </div>

      <RightBar />
      <InfoCard
        pos={pos ? "0" : "-50%"}
        props={info}
        onClick={() => setPos(false)}
      />
      <InfoCard2
        pos2={pos2 ? "0" : "-50%"}
        props={info2}
        onClick={() => setPos2(false)}
      />
    </div>
  );
};

export default Dashboard;
