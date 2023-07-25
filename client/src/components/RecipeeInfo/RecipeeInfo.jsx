import React, { useState } from "react";
import "./RecipeeInfo.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const RecipeeInfo = ({ info, pos, posMini, onClick }) => {
  const [nutrientBar, setNutrientBar] = useState(false);
  const screenWidth = window.innerWidth;

  return (
    <div
      className="recipee-info fixed text-white"
      style={screenWidth > 640 ? { right: pos } : { bottom: posMini }}
    >
      <nav className="flex justify-between mb-2 mt-7 w-full absolute top-0 px-5">
        <RxCross2
          className="text-white text-2xl cursor-pointer info-exit"
          onClick={onClick}
        />
      </nav>
      <div className="recipee-info-img h-2/5">
        <img src={info?.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="recipee-info-main h-3/5 sm:p-5 p-3 overflow-y-auto no-scrollbar">
        <div className="recipee-name">
          <h3 className="text-2xl font-semibold">{info?.name}</h3>
        </div>
        <div
          className="nutrients-container flex justify-between text-white mt-5 pb-3 cursor-pointer"
          onClick={() => setNutrientBar(!nutrientBar)}
        >
          <h3 className="font-semibold">Nutrients</h3>
          <MdOutlineKeyboardArrowDown className="text-xl" />
        </div>
        <div
          className="nutrients-content text-white mt-5"
          style={{ display: nutrientBar ? "block" : "none" }}
        >
          <ul className="text-sm">
            {info?.nutrients?.map((nutrient, index) => {
              return (
                <li className="mb-3 flex justify-between pb-3" key={index}>
                  <p>{nutrient.name}</p>
                  <p>{nutrient.quantity}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="recipee-desc mt-5 text-sm">
          <p>{info?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeeInfo;
