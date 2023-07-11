import React, { useEffect, useRef, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import {
  BsFillBasket2Fill,
  BsPeopleFill,
  BsFillGearFill
} from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "./Sidebar.css";
import image_1 from "../../utils/image_1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../utils/recipee_logo-cropped.png";

const Sidebar = ({ blur, sidebarView }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(null);
  const location = useLocation();
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
      name: "Favorites",
      link: "/favorites"
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
  useEffect(() => {
    const currPath = window.location.pathname.split("/")[1];
    const activeIndex = sideOptions.findIndex(
      (item) => item.link.split("/")[1] === currPath
    );
    setChecked(sideOptions[activeIndex]?.id);
  }, [location]);
  const screenWidth = window.innerWidth;
  // console.log(screenWidth < 640);
  return (
    <div
      className={`sidebar flex transition-all flex-col justify-between h-screen fixed sm:z-10 ${
        blur ? "brightness-50 transition-all" : ""
      }`}
      style={{ left: screenWidth < 640 ? (sidebarView ? "0" : "-100%") : "" }}
    >
      {/* <h1>Recipee</h1> */}
      <div className="sidebar-logo flex justify-center my-5 mx-auto w-full items-center">
        <img src={logo} alt="" className="" />
      </div>
      <div className="sidebar-options">
        <ul className="h-full flex flex-col justify-between">
          {sideOptions.map((item, index) => {
            return (
              <Link to={item.link} key={index}>
                <li
                  key={index}
                  className={checked === item.id ? "checked" : ""}
                >
                  <item.icon style={{ fontSize: "22px" }} />
                  <span>{item.name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="share-now mx-auto sm:mt-20 flex justify-center flex-col items-center relative">
        <p className="mx-5 mt-10">Share your recipe with us</p>
        <button onClick={() => navigate("/add-recipee")}>Share now</button>
        <img src={image_1} alt="" className="absolute" />
      </div>
    </div>
  );
};

export default Sidebar;
