import React, { useState } from "react";
import "./InfoCard.css";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineInfoCircle
} from "react-icons/ai";

const InfoCard = ({ props, pos }) => {
  const [quantity, setQuantity] = useState(0);
  const [liked, setLiked] = React.useState(false);
  const [bar, setBar] = useState(false);
  return (
    <div
      className="infocard h-screen fixed flex flex-col items-center"
      style={{ right: pos }}
    >
      <div className="collapse-bar absolute"></div>
      <nav className="flex justify-end mb-2 mt-7 ">
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
      <div className="info-img flex justify-center items-center">
        <img src={props.img} alt="" />
      </div>
      <div className="info-title flex flex-col items-center">
        <h2 className="text-white text-2xl">{props.title}</h2>
        <p className="my-3">{props.weight}</p>
        <div className="price-container flex items-center justify-center">
          <h2 className="text-xl price">Rs. {props.price}/-</h2>
        </div>
      </div>
      <div className="info-about mx-10 mt-10">
        <p className="text-white">{props.about}</p>
      </div>
      <div className="info-add w-full flex justify-center items-center mt-10">
        <div className="quantity-button flex items-center">
          <button
            onClick={() => quantity > 0 && setQuantity((prev) => prev - 1)}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className="text-white text-xl mx-3">{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button>Add to basket</button>
      </div>
    </div>
  );
};

export default InfoCard;
