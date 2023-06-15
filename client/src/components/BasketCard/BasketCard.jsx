import React from "react";
import { MdDelete } from "react-icons/md";
import "./BasketCard.css";

const BasketCard = (props) => {
  return (
    <div className="basketcard flex flex-1 items-center mb-5">
      <div className="item-start flex ml-5">
        <div className="item-img mr-5">
          <img src={props.img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="item-title flex flex-col justify-center">
          <h3 className="text-white mb-3 text-lg">{props.title}</h3>
          <div className="item-price flex">
            <p className="mr-5">Quantity : {props.quantity}</p>
            <p>Price : Rs. {props.price}/-</p>
          </div>
        </div>
      </div>
      <div className="item-end">
        <div className="item-delete flex items-center mb-3">
          <p className="mr-2">Delete</p>
          <MdDelete className="text-lg" />
        </div>
        <div className="total-price">
          <p>Total : Rs. {props.quantity * props.price}/-</p>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
