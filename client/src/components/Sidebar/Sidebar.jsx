import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import {
  BsFillBasket2Fill,
  BsPeopleFill,
  BsFillGearFill
} from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "./Sidebar.css";
import image_1 from "../../utils/image_1.png";
import { Link } from "react-router-dom";

const Sidebar = ({ blur }) => {
  const [checked, setChecked] = useState(1);
  const sideOptions = [
    {
      id: 1,
      icon: RxDashboard,
      name: "Dashboard",
      link: "/"
    },
    {
      id: 2,
      icon: BsFillBasket2Fill,
      name: "Basket",
      link: "/basket"
    },
    {
      id: 3,
      icon: AiOutlineHeart,
      name: "Favourites",
      link: "/favourites"
    },
    {
      id: 4,
      icon: BsPeopleFill,
      name: "Community",
      link: "/community"
    },
    {
      id: 5,
      icon: BsFillGearFill,
      name: "Settings",
      link: "/settings"
    }
  ];
  console.log(checked);
  return (
    <div
      className={`sidebar flex flex-col h-screen fixed ${
        blur ? "brightness-50 transition-all" : ""
      }`}
    >
      <h1>Recipee</h1>
      <div className="sidebar-options mt-20">
        <ul>
          {sideOptions.map((item, index) => {
            return (
              <Link to={item.link} key={index}>
                <li
                  key={index}
                  className={checked === item.id ? "checked" : ""}
                  onClick={() => setChecked(item.id)}
                >
                  <item.icon style={{ fontSize: "22px" }} />
                  <span>{item.name}</span>
                </li>
              </Link>
            );
          })}
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
