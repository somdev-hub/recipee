import React from "react";
import "./Checkout.css";
import { baskets } from "../../utils/providers/baskets";
import Draggable from "react-draggable";

const Checkout = ({ items }) => {
  return (
    <div className="checkout flex flex-col fixed h-screen">
      <h3 className="text-white mt-5 ml-5">Checkout</h3>
      <div className="total-container mt-10 flex flex-col items-center">
        <div className="total-cost  flex items-center ">
          <div className="total-col flex justify-between w-full mx-10">
            <p className="text-white">Items</p>
            <p className="text-white">Cost</p>
          </div>
        </div>
        <div className="total-orders mt-5 pb-5">
          {items?.map((item, index) => {
            return (
              <div className="flex justify-between mb-5" key={index}>
                <p className="text-white">
                  {index}. {item.basketItem.name}
                </p>
                <p className="text-white">
                  {item.quantity} x Rs. {item.basketItem.price}/-
                </p>
              </div>
            );
          })}
        </div>
        <div className="calculate-sum mt-5 flex justify-between">
          <p className="text-white">Sum total: </p>
          <p className="text-white">
            Rs.{" "}
            {items?.reduce(
              (prev, next) => prev + next.quantity * next.basketItem.price,
              0
            )}
            /-
          </p>
        </div>
        <div className="calculate-sum mt-5 flex justify-between">
          <p className="text-white">SGST: </p>
          <p className="text-white">Rs. 20/-</p>
        </div>
        <div className="calculate-sum mt-5 flex justify-between">
          <p className="text-white">CGST: </p>
          <p className="text-white">Rs. 10/-</p>
        </div>
        <div className="total-cost  flex items-center mt-5">
          <div className="total-col flex justify-between w-full mx-10">
            <p className="text-white">Total</p>
            <p className="text-white">Rs. 180/-</p>
          </div>
        </div>
      </div>
      <Draggable axis="y" bounds={{ top: -200, bottom: 0 }}>
        <div className="payment mt-10 flex flex-col items-center absolute">
          <div className="bar bg-white mt-3"></div>
          <button className="pay-button border-none mt-10">Pay Now</button>
          <div className="more-options mt-5 w-full">
            <h3 className="text-left text-white ml-5">More options</h3>
            <div className="button-container flex flex-col items-center mt-5">
              <button className="mb-5">PhonePe</button>
              <button className="mb-5">Paytm</button>
              <button className="mb-5">GooglePay</button>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Checkout;
