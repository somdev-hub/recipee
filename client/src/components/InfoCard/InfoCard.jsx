import React, { useState } from "react";
import "./InfoCard.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BASKET, SET_FAVORITES } from "../../utils/graphql/mutations";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SEARCH_FAVORITES } from "../../utils/graphql/queries";

const InfoCard = ({ props, pos, posMini, onClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [nutrientBar, setNutrientBar] = useState(false);
  const [addBasketItem, { loading }] = useMutation(ADD_BASKET, {
    variables: {
      user: localStorage.getItem("email"),
      addBasketItemId: props.id,
      quantity: quantity,
      type: "dish"
    }
  });
  const [addToFavoriteDish] = useMutation(SET_FAVORITES, {
    variables: {
      user: localStorage.getItem("email"),
      type: "dish",
      item: props.id
    }
  });
  const { data: searchFavorite } = useQuery(SEARCH_FAVORITES, {
    variables: {
      user: localStorage.getItem("email"),
      item: props.id
    }
  });

  const addToBasket = async () => {
    try {
      const response = await addBasketItem();
      console.log(response);
      if (response.data.addBasketItem.code === 200) {
        alert("Added to Basket");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
    setQuantity(1);
  };

  const screenWidth = window.innerWidth;
  return (
    <div
      className="infocard h-screen fixed flex flex-col items-center overflow-auto no-scrollbar"
      style={screenWidth > 640 ? { right: pos } : { bottom: posMini }}
    >
      <div className="collapse-bar absolute"></div>
      <nav className="flex justify-between mb-2 mt-7 w-full absolute top-0 px-5">
        <RxCross2
          className="text-white text-2xl cursor-pointer info-exit"
          onClick={onClick}
        />
      </nav>
      <div className="info-img flex justify-center items-center h-2/5 w-full">
        <img src={props.image} alt="" className="object-cover h-full w-full" />
      </div>
      <div className="px-5 pb-5">
        <div className="info-title flex justify-between items-center mt-5">
          <div className="dish-title-head">
            <h2 className="text-white sm:text-2xl text-xl font-semibold">
              {props.name}
            </h2>
            <p className="mt-2">{props.weight} gm</p>
          </div>
          <div className="price-container flex items-center justify-center">
            <h2 className="sm:text-xl text-base price p-3">
              Rs. {props.price}/-
            </h2>
          </div>
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
          <ul>
            {props?.nutrients?.map((nutrient, index) => {
              return (
                <li className="mb-3 flex justify-between pb-3" key={index}>
                  <p>{nutrient.name}</p>
                  <p>{nutrient.quantity}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="info-about mt-10">
          <p className="text-white text-sm">{props.dishDescription}</p>
        </div>
      </div>
      <div className="info-add w-full flex justify-between fixed items-center mt-10">
        <div className="quantity-button flex items-center">
          <button
            onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="text-white text-xl mx-3">{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button
          className="basket-button"
          onClick={addToBasket}
          disabled={loading}
        >
          {loading ? <span class="loader"></span> : "Add to basket"}
        </button>
        <button
          className="like-button flex justify-center items-center"
          onClick={() => {
            setLiked(!liked);
            addToFavoriteDish().then((res) => {
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
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
