import React, { useState } from "react";
import "./RightBar.css";
import { BsFillBellFill } from "react-icons/bs";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { pieData } from "../../utils/data/pie";
import PieChart from "../PieChart/PieChart";
import { AiOutlineArrowRight } from "react-icons/ai";
import { recipe } from "../../utils/providers/recipe";
import RecipeCard from "../RecipeCard/RecipeCard";

Chart.register(CategoryScale);

const RightBar = () => {
  const [chartData, setChartData] = useState({
    labels: pieData.map((data) => data.label),
    datasets: [
      {
        label: "Nutrients",
        data: pieData.map((data) => data.value),
        backgroundColor: [
          "#FED976",
          "#FD8D3C",
          "#FFEDA0",
          "#FEB24C",
          "#FED976"
        ],
        hoverOffset: 4
      }
    ]
  });
  return (
    <div className="rightbar flex h-screen flex-col fixed right-0">
      <div className="profile-icon flex mt-5 justify-end">
        <div className="icons flex justify-center items-center mr-5">
          <BsFillBellFill className="text-2xl text-white mr-3" />
          <span className="profile-img">
            {/* <img
              src="https://i.pinimg.com/originals/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
              alt=""
            /> */}
          </span>
        </div>
      </div>
      <div className="meter">
        <div className="flex flex-col justify-between ml-5 mt-7">
          <h3 className="text-white mb-2">Nutrient meter</h3>
          <p className="view">2000 calories today, 15000 this week</p>
        </div>

        <PieChart chartData={chartData} />
      </div>
      <div className="more-recipies">
        <div className="flex justify-between ml-5 mt-7">
          <h3 className="text-white">More recipies</h3>
          <p className="flex items-center gap-3 view mr-3">
            View all
            <AiOutlineArrowRight />
          </p>
        </div>
        <div className="recipe-container mt-5 ml-5 overflow-x-auto">
          <div className="recipies flex">
            {recipe.map((item, index) => {
              return <RecipeCard img={item.img} name={item.name} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
