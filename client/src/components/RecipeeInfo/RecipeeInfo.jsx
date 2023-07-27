import React, { useEffect, useState } from "react";
import "./RecipeeInfo.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_PROFILE_HEAD,
  SEARCH_FAVORITES
} from "../../utils/graphql/queries";
import { ADD_LIKE, SET_FAVORITES } from "../../utils/graphql/mutations";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";

const RecipeeInfo = ({ info, pos, posMini, onClick }) => {
  const [nutrientBar, setNutrientBar] = useState(false);
  const [liked, setLiked] = useState(false);
  const [addToFavoriteRecipee] = useMutation(SET_FAVORITES, {
    variables: {
      user: localStorage.getItem("email"),
      type: "recipees",
      item: info?.id
    }
  });
  const [ingredientBar, setIngredientBar] = useState(false);
  const screenWidth = window.innerWidth;
  const { data: profileData } = useQuery(GET_PROFILE_HEAD, {
    variables: {
      email: info?.author
    }
  });
  const [likes, setLikes] = useState(false);
  // console.log("likes is " + info?.likes);
  // console.log("liked by is " + info?.likedBy);
  useEffect(() => {
    info?.likedBy?.forEach((like) => {
      if (like === localStorage.getItem("email")) {
        setLikes(true);
      }
    });
  }, [info?.likedBy]);

  const { data: searchFavorite } = useQuery(SEARCH_FAVORITES, {
    variables: {
      user: localStorage.getItem("email"),
      item: info?.id
    }
  });
  const [addLike] = useMutation(ADD_LIKE, {
    variables: {
      type: "recipee",
      item: info?.id,
      user: localStorage.getItem("email")
    }
  });
  // console.log(info?.likes);
  return (
    <div
      className="recipee-info fixed text-white"
      style={screenWidth > 640 ? { right: pos } : { bottom: posMini }}
    >
      <nav className="flex justify-between mb-2 mt-7 w-full absolute items-center top-0 px-5">
        <RxCross2
          className="text-white text-2xl cursor-pointer info-exit"
          onClick={onClick}
        />
        <div
          className="flex liked-icon rounded-full h-8 w-8"
          onClick={() => {
            setLiked(!liked);
            addToFavoriteRecipee().then((res) => {
              if (res.data.addToFavorites.code === 200) {
                alert("Added to Favorites");
              }
            });
          }}
        >
          {searchFavorite?.searchFavorites?.success ? (
            liked ? (
              <AiOutlineHeart className=" text-white text-2xl cursor-pointer m-auto" />
            ) : (
              <AiFillHeart className=" text-white text-2xl cursor-pointer m-auto" />
            )
          ) : liked ? (
            <AiFillHeart className=" text-white text-2xl cursor-pointer m-auto" />
          ) : (
            <AiOutlineHeart className=" text-white text-2xl cursor-pointer m-auto" />
          )}
        </div>
      </nav>
      <div className="recipee-info-img h-2/5">
        <img src={info?.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="recipee-info-main h-3/5 sm:p-5 p-3 overflow-y-auto no-scrollbar">
        <div className="recipee-head flex justify-between w-full">
          <div className="recipee-name">
            <h3 className="text-2xl font-semibold">{info?.name}</h3>
          </div>
          <div className="recipee-author  flex items-center gap-3">
            <div className="recipee-author-image h-8 w-8">
              <img
                src={profileData?.getProfile.image}
                alt=""
                className="rounded-full object-cover h-full w-full"
              />
            </div>
            <div className="recipee-author-name text-sm flex">
              <p>
                {profileData?.getProfile.firstName}{" "}
                {profileData?.getProfile.lastName}
              </p>
            </div>
          </div>
        </div>
        <div className="recipee-category mt-5 flex justify-between items-center">
          <p className="">{info?.category}</p>
          <div className="like-count flex justify-evenly items-center">
            <div
              className="cursor-pointer"
              onClick={async () => {
                addLike().then((res) => {
                  if (res.data.addLike.code === 200) {
                    alert(res.data.addLike.message);
                  }
                });
                setLikes(!likes);
                // likes
                //   ? setLikeNumber(likeNumber + 1)
                //   : setLikeNumber(likeNumber - 1);
              }}
            >
              {likes ? (
                <BiSolidLike className="text-2xl" />
              ) : (
                <BiLike className="text-2xl" />
              )}
              {/* <BiLike className="text-2xl" /> */}
            </div>
            <p className="text-xl font-medium">|</p>
            <p className="text-xl font-medium">
              {likes ? info?.likes + 1 : info?.likes}
            </p>
          </div>
        </div>

        <div
          className="nutrients-container flex justify-between text-white mt-5 pb-3 cursor-pointer"
          onClick={() => setNutrientBar(!nutrientBar)}
        >
          <h3 className="font-medium">Nutrients</h3>
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
        <div
          className="nutrients-container flex justify-between text-white mt-5 pb-3 cursor-pointer"
          onClick={() => setIngredientBar(!ingredientBar)}
        >
          <h3 className="font-medium">Ingredients</h3>
          <MdOutlineKeyboardArrowDown className="text-xl" />
        </div>
        <div
          className="nutrients-content text-white mt-5"
          style={{ display: ingredientBar ? "block" : "none" }}
        >
          <ul className="text-sm">
            {info?.ingredients?.map((ingredient, index) => {
              return (
                <li className="mb-3 pb-3" key={index}>
                  <p>{ingredient}</p>
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
