import React from "react";
import { RxDashboard } from "react-icons/rx";
import {
  BsFillBasket2Fill,
  BsPeopleFill,
  BsFillGearFill
} from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "./Sidebar.css";
import image_1 from "../../utils/image_1.png";

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col h-screen">
      <h1>Recipee</h1>
      <div className="sidebar-options mt-20 ml-5">
        <ul>
          <li>
            <RxDashboard style={{ fontSize: "22px" }} />
            <span>Dashboard</span>
          </li>
          <li>
            <BsFillBasket2Fill style={{ fontSize: "22px" }} />
            <span>Basket</span>
          </li>
          <li>
            <AiOutlineHeart style={{ fontSize: "22px" }} />
            <span>Favourites</span>
          </li>
          <li>
            <BsPeopleFill style={{ fontSize: "22px" }} />
            <span>Community</span>
          </li>
          <li>
            <BsFillGearFill style={{ fontSize: "22px" }} />
            <span>Settings</span>
          </li>
        </ul>
      </div>
      <div className="share-now mx-auto mt-20 flex justify-center flex-col items-center relative">
        <p className="mx-5 mt-10">Share your recipe with us</p>
        <button>Share now</button>
        <img src={image_1} alt="" className="absolute" />
      </div>
    </div>
  );
};

export default Sidebar;
