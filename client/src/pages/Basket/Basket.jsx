import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Basket.css";
import { basket } from "../../utils/providers/basket";
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkout from "../../components/Checkout/Checkout";

const Basket = () => {
  return (
    <div className="basket flex">
      <Sidebar />
      <div className="basket-main mt-5">
        <nav className="">
          <h2 className="text-white">Your Basket</h2>
        </nav>
        <div className="basket-items-container mt-10">
          <div className="basket-items">
            {basket.map((item, index) => {
              return (
                <BasketCard
                  key={index}
                  img={item.img}
                  title={item.title}
                  quantity={item.quantity}
                  price={item.price}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Checkout/>
    </div>
  );
};

export default Basket;
