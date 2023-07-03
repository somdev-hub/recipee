import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Basket.css";
import { basket } from "../../utils/providers/baskets";
import BasketCard from "../../components/BasketCard/BasketCard";
import Checkout from "../../components/Checkout/Checkout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_BASKET } from "../../utils/graphql/queries";
import Loader from "../../components/Loader/Loader";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const Basket = () => {
  const { loading, error, data } = useQuery(GET_BASKET, {
    variables: {
      user: localStorage.getItem("email")
    }
  });
  const [checkoutBar, setCheckoutBar] = useState(false);
  const [sidebarView, setSidebarView] = useState(false);
  console.log(data);
  return (
    <div className="basket flex">
      <Sidebar sidebarView={sidebarView} />
      {loading && <Loader />}
      <div className="basket-main sm:mt-5">
        <MobileNavbar
          setSidebarView={setSidebarView}
          sidebarView={sidebarView}
          setRightbarView={setCheckoutBar}
          rightbarView={checkoutBar}
        />
        <div
          className=""
          onClick={() => {
            setSidebarView(false);
            setCheckoutBar(false);
          }}
        >
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
      </div>
      <Checkout
        items={data?.basket}
        loading={loading}
        rightbarView={checkoutBar}
      />
    </div>
  );
};

export default Basket;
