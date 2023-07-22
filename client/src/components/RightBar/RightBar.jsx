import React, { useEffect, useState } from "react";
import "./RightBar.css";
import { BsFillBellFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import RecipeCard from "../RecipeCard/RecipeCard";
import {
  GET_BASKET_CALORIES,
  GET_BASKET_NUTRIENTS,
  GET_PROFILE_HEAD,
  GET_RECIPEES
} from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Loader2 from "../Loader2/Loader2";
import { PieChart, Pie, Tooltip } from "recharts";

// Chart.register(CategoryScale);

const RightBar = (props) => {
  const { data } = useQuery(GET_PROFILE_HEAD, {
    variables: {
      email: localStorage.getItem("email")
    }
  });
  const { loading: recipeeLoading, data: recipeeData } = useQuery(GET_RECIPEES);
  const { loading: nutrientLoading, data: nutrientData } = useQuery(
    GET_BASKET_NUTRIENTS,
    {
      variables: {
        user: localStorage.getItem("email")
      }
    }
  );
  const {
    error: calorieError,
    loading: caloriesLoading,
    data: caloriesData
  } = useQuery(GET_BASKET_CALORIES, {
    variables: {
      user: localStorage.getItem("email")
    }
  });
  const [nutrientArray, setNutrientArray] = useState([]);

  useEffect(() => {
    if (nutrientData) {
      const newNutrientArray = [...nutrientArray];
      nutrientData.basket.forEach((item) => {
        item.dish.nutrients.forEach((nutrient) => {
          const existingNutrientIndex = newNutrientArray.findIndex(
            (nutrientItem) => nutrientItem.name === nutrient.name
          );
          if (existingNutrientIndex !== -1) {
            newNutrientArray[existingNutrientIndex].value += parseInt(
              nutrient.quantity
            );
          } else {
            newNutrientArray.push({
              name: nutrient.name,
              value: parseInt(nutrient.quantity)
            });
          }
        });
      });
      setNutrientArray(newNutrientArray);
    }
  }, [nutrientData]);

  // console.log(nutrientArray);
  const calories = caloriesData?.basket?.reduce(
    (prev, curr) => prev + parseInt(curr?.dish.calories),
    0
  );
  console.log(calories);

  if(calorieError)console.log(calorieError);

  const [popup, setPopup] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const screenWidth = window.innerWidth;
  return (
    <div
      className="rightbar flex h-screen flex-col fixed right-0 transition-all"
      style={
        screenWidth < 640
          ? { right: props.rightbarView ? "0" : "-100%" }
          : { right: "0" }
      }
    >
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
            className="profile-pop-up absolute p-5 flex-col justify-around z-50"
            style={{ display: popup ? "flex" : "none" }}
          >
            <div className="profile-pop-up-head flex items-center">
              <div className="profile-pop-up-img rounded-full mr-3">
                <img
                  src={data?.getProfile.image ? data?.getProfile.image : ""}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="profile-pop-up-name">
                <h3 className="sm:text-lg text-sm">{`${data?.getProfile.firstName} ${data?.getProfile.lastName}`}</h3>
                <p className="text-sm">{`${data?.getProfile.email}`}</p>
              </div>
            </div>
            <div className="profile-pop-up-buttons flex justify-between">
              <Link to="/profile">
                <button>Profile</button>
              </Link>
              <button onClick={logOut}>Log Out</button>
            </div>
          </div>
        </div>
      </div>
      <div className="meter">
        <div className="flex flex-col justify-between ml-5 mt-7">
          <h3 className="text-white mb-2">Nutrient meter</h3>
          {caloriesLoading ? (
            <p className="view">Loading...</p>
          ) : (
            <p className="view">
              {caloriesData?.basket?.reduce(
                (prev, curr) => prev + parseInt(curr?.dish.calories),
                0
              )}{" "}
              calories today, 15000 this week
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <PieChart
            width={screenWidth < 640 ? 250 : 300}
            height={screenWidth < 640 ? 250 : 300}
            // width={300}
            // height={300}
          >
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={nutrientArray && nutrientArray}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#f5a504"
              label
              blendStroke={false}
            />

            <Tooltip />
          </PieChart>
        </div>
        {/* </ResponsiveContainer> */}
      </div>
      <div className="more-recipies h-full">
        <div className="flex justify-between ml-5 mt-7">
          <h3 className="text-white">More recipees</h3>
          <Link to="/all-recipees">
            <p className="flex items-center gap-3 view mr-3">
              View all
              <AiOutlineArrowRight />
            </p>
          </Link>
        </div>
        <div className="recipe-container mt-5 ml-5 overflow-x-auto h-full">
          <div className="mx-5">{recipeeLoading && <Loader2 />}</div>
          {recipeeData && (
            <div className="recipies flex">
              {recipeeData?.recipees.slice(0, 4).map((item, index) => {
                return <RecipeCard props={item} key={index} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
