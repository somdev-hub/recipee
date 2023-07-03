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

const InfoCard = ({ props, pos, posMini, onClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
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
      className="infocard h-screen fixed flex flex-col items-center"
      style={screenWidth > 640 ? { right: pos } : { bottom: posMini }}
    >
      <div className="collapse-bar absolute"></div>
      <nav className="flex justify-between mb-2 mt-7 ">
        <RxCross2
          className="text-white text-2xl cursor-pointer"
          onClick={onClick}
        />
        <div className="collapse-icons flex">
          <div
            className="mr-2"
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
          </div>
          <AiOutlineInfoCircle
            className="text-white text-2xl cursor-pointer"
            onClick={() => setBar(!bar)}
          />
        </div>
        {bar ? (
          <div className="nutrients absolute p-5">
            <div className="nutrient-content text-white">
              <ul>
                <li className="mb-3">Proteins : 50gm</li>
                <li className="mb-3">Carbohydrates : 100gm</li>
                <li className="mb-3">Fats : 80gm</li>
                <li className="mb-3">Vitamins : 100gm</li>
                <li className="mb-3">Iron : 20gm</li>
              </ul>
            </div>
          </div>
        ) : null}
      </nav>
      <div className="info-img flex justify-center items-center">
        <img src={props.image} alt="" />
      </div>
      <div className="info-title flex flex-col items-center">
        <h2 className="text-white text-2xl">{props.name}</h2>
        <p className="my-3">{props.weight} gm</p>
        <div className="price-container flex items-center justify-center">
          <h2 className="text-xl price">Rs. {props.price}/-</h2>
        </div>
      </div>
      <div className="info-about mx-10 mt-10">
        <p className="text-white sm:text-base text-sm">
          {props.dishDescription}
        </p>
      </div>
      <div className="info-add w-full flex justify-center items-center mt-10">
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
          onClick={async () => {
            await addBasketItem();
            setQuantity(1);
          }}
          disabled={loading}
        >
          {loading ? <span class="loader"></span> : "Add to basket"}
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
