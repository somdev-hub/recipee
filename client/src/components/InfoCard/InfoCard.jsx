import React, { useState } from "react";
import "./InfoCard.css";

const InfoCard = ({ props, pos }) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <div
      className="infocard h-screen fixed flex flex-col items-center"
      style={{ right: pos }}
    >
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
            disabled={quantity===0}
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
