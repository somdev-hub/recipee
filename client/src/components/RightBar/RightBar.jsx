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
// import { GET_PROFILE_HEAD } from "../../utils/graphql/mutations";
import { GET_PROFILE_HEAD } from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";

Chart.register(CategoryScale);

const RightBar = () => {
  const { data } = useQuery(GET_PROFILE_HEAD, {
    variables: {
      email: localStorage.getItem("email")
    }
  });
  console.log(data);
  const [popup, setPopup] = useState(false);
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
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="rightbar flex h-screen flex-col fixed right-0">
      <div className="profile-icon flex mt-5 justify-end">
        <div className="icons flex justify-center items-center mr-5 relative">
          <BsFillBellFill className="text-2xl text-white mr-3" />
          <span
            className="profile-img cursor-pointer"
            onClick={() => setPopup(!popup)}
          >
            <img
              src={data?.getProfile.image ? data?.getProfile.image : ""}
              alt=""
            />
          </span>
          <div
            className="profile-pop-up absolute p-5 flex-col justify-around"
            style={{ display: popup ? "flex" : "none" }}
          >
            <div className="profile-pop-up-head flex items-center">
              <div className="profile-pop-up-img rounded-full mr-3">
                <img
                  src={data?.getProfile.image ? data?.getProfile.image : ""}
                  alt=""
                />
              </div>
              <div className="profile-pop-up-name">
                <h3 className="text-lg">{`${data?.getProfile.firstName} ${data?.getProfile.lastName}`}</h3>
                <p className="text-sm">{`${data?.getProfile.email}`}</p>
              </div>
            </div>
            <div className="profile-pop-up-buttons flex justify-between">
              <button>Profile</button>
              <button onClick={logOut}>Log Out</button>
            </div>
          </div>
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
