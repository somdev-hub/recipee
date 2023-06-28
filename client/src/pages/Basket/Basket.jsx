import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Basket.css";
import { basket } from "../../utils/providers/baskets";
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkout from "../../components/Checkout/Checkout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_BASKET } from "../../utils/graphql/queries";


const Basket = () => {
  const { loading, error, data } = useQuery(GET_BASKET, {
    variables: {
      basketUser: localStorage.getItem("email")
    }
  });
  console.log(data);
  return (
    <div className="basket flex">
      <Sidebar />
      <div className="basket-main mt-5">
        <nav className="">
          <h2 className="text-white">Your Basket</h2>
        </nav>
        <div className="basket-items-container mt-10">
          <div className="basket-items">
            {data?.basket.map((item, index) => {
              return (
                <BasketCard
                  key={index}
                  img={item.basketItem.image}
                  title={item.basketItem.name}
                  quantity={item.quantity}
                  price={item.basketItem.price}
                  id={item.id}
                  // setDeleted={setDeleted}
                  // setBasketItemId={setBasketItemId}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Checkout items={data?.basket} />
    </div>
  );
};

export default Basket;
