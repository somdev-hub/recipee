import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineInfoCircle
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BASKET, SET_FAVORITE_DISH } from "../../utils/graphql/mutations";
import { GET_FAVORITE_DISHES } from "../../utils/graphql/queries";
import { BsArrowDownCircle } from "react-icons/bs";

const InfoCard = ({ props, pos, posMini, onClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [nutrientBar, setNutrientBar] = useState(false);
  const [bar, setBar] = useState(false);
  const [addBasketItem, { loading }] = useMutation(ADD_BASKET, {
    variables: {
      basketUser: localStorage.getItem("email"),
      addBasketItemId: props.id,
      quantity: quantity
    }
  });
  const [addToFavoriteDish] = useMutation(SET_FAVORITE_DISH, {
    variables: { addToFavoriteDishId: props.id }
  });
  const { loading1, error, data } = useQuery(GET_FAVORITE_DISHES);

  // console.log(data);

  useEffect(() => {
    if (data?.favoriteDishes) {
      data.favoriteDishes.forEach((element) => {
        const dishname = element.dish.name;
        if (dishname === props.name) {
          setLiked(true);
        }
      });
    }
  }, [data, props.name]);

  const screenWidth = window.innerWidth;
  return (
    <div
      className="infocard h-screen fixed flex flex-col items-center overflow-auto no-scrollbar"
      style={screenWidth > 640 ? { right: pos } : { bottom: posMini }}
    >
      <div className="collapse-bar absolute"></div>
      <nav className="flex justify-between mb-2 mt-7 w-full absolute top-0 px-5">
        <RxCross2
          className="text-white text-2xl cursor-pointer"
          onClick={onClick}
        />
      </nav>
      <div className="info-img flex justify-center items-center h-2/5 w-full">
        <img src={props.image} alt="" className="object-cover h-full w-full" />
      </div>
      <div className="px-5 pb-5">
        <div className="info-title flex justify-between items-center mt-5">
          <div className="dish-title-head">
            <h2 className="text-white text-2xl font-semibold">{props.name}</h2>
            <p className="mt-2">{props.weight} gm</p>
          </div>
          <div className="price-container flex items-center justify-center">
            <h2 className="text-xl price">Rs. {props.price}/-</h2>
          </div>
        </div>
        <div
          className="nutrients-container flex justify-between text-white mt-5 pb-3 cursor-pointer"
          onClick={() => setNutrientBar(!nutrientBar)}
        >
          <h3 className="font-semibold">Nutrients</h3>
          <BsArrowDownCircle className="text-xl" />
        </div>
        <div
          className="nutrients-content text-white mt-5"
          style={{ display: nutrientBar ? "block" : "none" }}
        >
          <ul>
            {props?.nutrients?.map((nutrient, index) => {
              // console.log(props.name + "" + nutrient.quantity);
              console.log(nutrient.name);
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
          onClick={async () => {
            await addBasketItem();
            setQuantity(1);
          }}
          disabled={loading}
        >
          {loading ? <span class="loader"></span> : "Add to basket"}
        </button>
        <button
          className="like-button flex justify-center items-center"
          onClick={() => {
            setLiked(!liked);
            addToFavoriteDish();
          }}
        >
          {liked ? (
            <AiFillHeart className="mr-2 text-white text-2xl cursor-pointer" />
          ) : (
            <AiOutlineHeart className="mr-2 text-white text-2xl cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
