import React, { useState } from "react";
import "./InfoCard2.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ADD_BASKET, SET_FAVORITES } from "../../utils/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { SEARCH_FAVORITES } from "../../utils/graphql/queries";

const InfoCard2 = ({ props, pos2, onClick, posMini }) => {
  const [quantity, setQuantity] = useState(1);
  const [nutrientBar, setNutrientBar] = useState(false);
  const [liked, setLiked] = useState(false);
  const [addBasketItem] = useMutation(ADD_BASKET, {
    variables: {
      user: localStorage.getItem("email"),
      addBasketItemId: props.id,
      quantity: quantity,
      type: "category"
    }
  });
  const [addToFavoriteDish] = useMutation(SET_FAVORITES, {
    variables: {
      user: localStorage.getItem("email"),
      type: "category",
      item: props.id
    }
  });
  const { data: searchFavorite } = useQuery(SEARCH_FAVORITES, {
    variables: {
      user: localStorage.getItem("email"),
      item: props.id
    }
  });
  console.log(searchFavorite);
  const screenWidth = window.innerWidth;
  return (
    <div
      className="infocard2 h-screen fixed flex flex-col items-center"
      style={screenWidth > 640 ? { right: pos2 } : { bottom: posMini }}
    >
      <nav className="flex justify-between  mt-5 absolute z-10 w-full px-5">
        <RxCross2
          className="text-white text-2xl cursor-pointer"
          onClick={onClick}
        />
        <div className="collapse-icons flex">
          <div
            className="mr-2"
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
                <AiOutlineHeart className="mr-2 text-white text-2xl cursor-pointer m-auto" />
              ) : (
                <AiFillHeart className="mr-2 text-white text-2xl cursor-pointer m-auto" />
              )
            ) : liked ? (
              <AiFillHeart className="mr-2 text-white text-2xl cursor-pointer m-auto" />
            ) : (
              <AiOutlineHeart className="mr-2 text-white text-2xl cursor-pointer m-auto" />
            )}
          </div>
        </div>
      </nav>
      <div
        className="infocard2-img flex items-end  relative"
        style={{
          background: `url(${props.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <h2 className="text-3xl text-white font-bold mb-16 ml-5 absolute">
          {props.name}
        </h2>
      </div>

      <div className="infocard2-main absolute p-5 overflow-scroll">
        <div className="infocard2-tags flex flex-wrap gap-3">
          {props.tags &&
            props.tags.map((item, index) => {
              return (
                <p key={index} className="">
                  {item}
                </p>
              );
            })}
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
        <div className="infocard2-content mt-5">
          <h3 className="mb-3">About</h3>
          <p className="text-sm">{props.description}</p>
        </div>
        <div className="dishes-container mb-16">
          <h3 className="mb-5 text-white mt-5">Dishes</h3>
          <div className="cuisine-dishes grid grid-cols-3 grid-rows-2 gap-3">
            {props.dishes &&
              props.dishes.map((item, index) => {
                return (
                  <div
                    className="cuisine-dish flex flex-col justify-center items-center"
                    key={index}
                  >
                    <div className="dish-img mb-3 rounded-full">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="dish-title flex flex-col justify-center items-center text-sm text-white">
                      <h4 className="mb-2">{item.name}</h4>
                      <p>Rs. {item.price}/-</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="info-add info2-add w-full flex justify-between fixed items-center mt-10">
        <div className="quantity-button q-buttons2 flex items-center">
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
          onClick={() => {
            try {
              addBasketItem().then((res) => {
                console.log(res);
                if (res.data.addBasketItem.code === 200) {
                  alert("Item added to basket");
                } else {
                  alert("something went wrong");
                }
              });
            } catch (error) {
              console.log(error);
            }
            setQuantity(1);
          }}
          // disabled={loading}
        >
          {/* {loading ? <span class="loader"></span> : "Add to basket"} */}
          Add to basket
        </button>
        <h4 className="text-white ml-2 ">Rs. 500/-</h4>
      </div>
    </div>
  );
};

export default InfoCard2;
