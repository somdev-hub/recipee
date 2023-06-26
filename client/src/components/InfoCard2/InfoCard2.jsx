import React, { useState } from "react";
import "./InfoCard2.css";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineInfoCircle
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const InfoCard2 = ({ props, pos2, onClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [bar, setBar] = useState(false);
  return (
    <div
      className="infocard2 h-screen fixed flex flex-col items-center"
      style={{ right: pos2 }}
    >
      <nav className="flex justify-between  mt-5 absolute z-10 w-full px-5">
        <RxCross2
          className="text-white text-2xl cursor-pointer"
          onClick={onClick}
        />
        <div className="collapse-icons flex">
          <div className="mr-2" onClick={() => setLiked(!liked)}>
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
      <div
        className="infocard2-img flex items-end  relative"
        style={{
          background: `url(${props.cuisineBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <h2 className="text-3xl text-white font-bold mb-16 ml-5 absolute">
          {props.cuisineName}
        </h2>
      </div>

      <div className="infocard2-main absolute p-5 overflow-scroll">
        <div className="infocard2-tags flex flex-wrap gap-3">
          {props.tags &&
            props.tags.map((item, index) => {
              return (
                <p key={index} className="">
                  #{item}
                </p>
              );
            })}
        </div>
        <div className="infocard2-content mt-5">
          <h3 className="mb-3">About</h3>
          <p className="text-sm">{props.cuisineContent}</p>
        </div>
        <div className="dishes-container">
          <h3 className="mb-5 text-white mt-5">Dishes</h3>
          <div className="cuisine-dishes grid grid-cols-3 grid-rows-2 gap-3">
            {props.foods &&
              props.foods.map((item, index) => {
                return (
                  <div
                    className="cuisine-dish flex flex-col justify-center items-center"
                    key={index}
                  >
                    <div className="dish-img mb-3">
                      <img src={item.foodImg} alt="" />
                    </div>
                    <div className="dish-title flex flex-col justify-center items-center text-sm text-white">
                      <h4 className="mb-2">{item.foodName}</h4>
                      <p>Rs. {item.price}/-</p>
                    </div>
                    {/* <div className="dish-quantity flex items-center mt-2">
                      <button>-</button>
                      <p className="text-white mx-2">{quantity}</p>
                      <button>+</button>
                    </div> */}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="info-add w-full flex justify-start items-center mt-10">
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
            onClick={() => {
              // addBasketItem();
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
    </div>
  );
};

export default InfoCard2;
